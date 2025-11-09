// ID Card Scanner Class
class IDCardScanner {
    constructor() {
        this.initializeProperties();
        this.initializeEventListeners();
        this.loadSavedRecords();
        this.createDepartmentTables();
        this.createRecordsPageLink();
        this.addPaperModeToggle();
        this.addSoundToggle();
        this.createScanSound();
    }

    // OCR CONFIG - ONLY ALLOW NUMBERS AND SLASHES
    getOptimizedOCRConfig() {
        return this.paperMode ? {
            tessedit_pageseg_mode: 6,
            tessedit_char_whitelist: '0123456789-,.()/ ',
            tessedit_ocr_engine_mode: 1,
            tessedit_blacklist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
            tessedit_do_invert: 0,
            textord_min_linesize: 2.5,
            textord_old_baselines: 0,
            tessedit_char_blacklist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
            classify_bln_numeric_mode: 1,
            textord_debug_tabfind: 0
        } : {
            tessedit_pageseg_mode: 6,
            tessedit_char_whitelist: '0123456789/- ', // ONLY NUMBERS AND SLASHES
        };
    }

    // ========== INITIALIZATION METHODS ==========

    initializeProperties() {
        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentDataDiv = document.getElementById('currentData');
        this.recordsList = document.getElementById('recordsList');
        
        this.stream = null;
        this.currentScan = null;
        this.allRecords = [];
        this.isScanning = false;
        this.scanInterval = null;
        
        // CHANGED: Reduced scan delay to 1.5 seconds for faster crowd processing
        this.scanDelay = 1500; // 1.5 seconds
        
        // Paper scanning mode
        this.paperMode = false;
        this.detectedNumbers = [];
        
        // Sound settings
        this.soundEnabled = true;
        
        // Department tracking system - UPDATED WITH NEW DEPARTMENTS
        this.departments = {
            'ARC': { name: 'Architecture', records: [], count: 0 },
            'CMPI': { name: 'Computer Science', records: [], count: 0 },
            'MLS': { name: 'Medical Lab Science', records: [], count: 0 },
            'SMS': { name: 'School of Management', records: [], count: 0 },
            'NURS': { name: 'Nursing', records: [], count: 0 },
            'LAW': { name: 'Law', records: [], count: 0 },
            'SCI': { name: 'Science', records: [], count: 0 },
            'IFT': { name: 'Information Technology', records: [], count: 0 },
            'MAC': { name: 'Mass Communication', records: [], count: 0 },
            'IRS': { name: 'International Relations', records: [], count: 0 },
            'PAPER': { name: 'Paper Numbers', records: [], count: 0 }
        };
    }

    initializeEventListeners() {
        document.getElementById('startCamera').addEventListener('click', () => this.startCamera());
        document.getElementById('capture').style.display = 'none';
        document.getElementById('nextPerson').style.display = 'none';
        document.getElementById('manualForm').addEventListener('submit', (e) => this.handleManualEntry(e));
        
        // Add clear records listener
        document.getElementById('clearRecordsBtn').addEventListener('click', () => this.clearAllRecords());
        
        this.addStatusElement();
        this.addCopyFunctionality();
    }

    // ========== SOUND METHODS ==========

    addSoundToggle() {
        const soundToggleContainer = document.createElement('div');
        soundToggleContainer.className = 'sound-toggle-container';
        soundToggleContainer.innerHTML = `
            <label class="sound-toggle">
                <input type="checkbox" id="soundToggle" checked>
                <span class="sound-toggle-slider"></span>
                <span class="sound-toggle-label">🔊 Scan Sound</span>
            </label>
        `;
        
        const paperToggle = document.querySelector('.mode-toggle-container');
        if (paperToggle) {
            paperToggle.parentNode.insertBefore(soundToggleContainer, paperToggle.nextSibling);
        } else {
            document.querySelector('.scanner-section').insertBefore(soundToggleContainer, document.getElementById('startCamera'));
        }
        
        document.getElementById('soundToggle').addEventListener('change', (e) => {
            this.soundEnabled = e.target.checked;
            this.updateStatus(
                this.soundEnabled ? 
                '🔊 Scan sound enabled' : 
                '🔇 Scan sound disabled', 
                'info'
            );
        });
    }

    createScanSound() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
        }
    }

    playScanSound() {
        if (!this.soundEnabled || !this.audioContext) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.value = 800;
            gainNode.gain.value = 0.1;
            
            const now = this.audioContext.currentTime;
            
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.1);
            
            oscillator.start(now);
            oscillator.stop(now + 0.1);
            
        } catch (error) {
            console.log('Could not play scan sound:', error);
        }
    }

    // ========== CLEAR RECORDS METHOD ==========

    clearAllRecords() {
        if (confirm('Are you sure you want to clear ALL records? This action cannot be undone.')) {
            // Clear all records arrays
            this.allRecords = [];
            
            // Reset department data
            Object.keys(this.departments).forEach(deptCode => {
                this.departments[deptCode].records = [];
                this.departments[deptCode].count = 0;
            });
            
            // Clear localStorage
            localStorage.removeItem('studentRecords');
            localStorage.removeItem('departmentRecords');
            
            // Update displays
            this.updateRecordsDisplay();
            this.updateDepartmentTables();
            
            this.updateStatus('🗑️ All records cleared successfully', 'info');
            
            // Play sound for feedback
            this.playClearSound();
        }
    }

    playClearSound() {
        if (!this.soundEnabled || !this.audioContext) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.type = 'sine';
            oscillator.frequency.value = 400; // Lower pitch for clear action
            gainNode.gain.value = 0.1;
            
            const now = this.audioContext.currentTime;
            
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.1, now + 0.05);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
            
            oscillator.start(now);
            oscillator.stop(now + 0.3);
            
        } catch (error) {
            console.log('Could not play clear sound:', error);
        }
    }

    // ========== PAPER SCANNING METHODS ==========

    addPaperModeToggle() {
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'mode-toggle-container';
        toggleContainer.innerHTML = `
            <label class="mode-toggle">
                <input type="checkbox" id="paperModeToggle">
                <span class="toggle-slider"></span>
                <span class="toggle-label">Paper Number Mode</span>
            </label>
        `;
        
        document.querySelector('.scanner-section').insertBefore(toggleContainer, document.getElementById('startCamera'));
        
        document.getElementById('paperModeToggle').addEventListener('change', (e) => {
            this.paperMode = e.target.checked;
            this.updateStatus(
                this.paperMode ? 
                '📄 Paper number scanning activated' : 
                '🪪 ID card scanning activated', 
                'info'
            );
        });
    }

    // ========== CAMERA CONTROL METHODS ==========

    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'environment',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                } 
            });
            
            this.video.srcObject = this.stream;
            document.getElementById('startCamera').disabled = true;
            document.getElementById('startCamera').textContent = 'Camera Active';
            
            // CHANGED: Reduced initial delay
            setTimeout(() => this.startAutoScan(), 800);
            
        } catch (err) {
            console.error('Error accessing camera:', err);
            alert('Error accessing camera. Please make sure you have granted camera permissions.');
        }
    }

    startAutoScan() {
        this.isScanning = true;
        this.updateStatus('🔄 Automated scanning started (1.5s speed)...', 'scanning');
        
        // CHANGED: Using 1.5 second interval for faster processing
        this.scanInterval = setInterval(() => {
            this.captureAndProcess();
        }, this.scanDelay);
        
        // CHANGED: Reduced initial capture delay
        setTimeout(() => this.captureAndProcess(), 300);
    }

    stopAutoScan() {
        this.isScanning = false;
        if (this.scanInterval) {
            clearInterval(this.scanInterval);
        }
        this.updateStatus('⏸️ Automated scanning stopped', 'stopped');
    }

    stopCamera() {
        this.stopAutoScan();
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
    }

    // ========== IMPROVED OCR PROCESSING ==========

    async processImageWithOCR(imageData) {
        const response = await fetch(imageData);
        const blob = await response.blob();
        
        const ocrConfig = this.paperMode ? 
            {
                tessedit_pageseg_mode: 8,
                tessedit_char_whitelist: '0123456789-,.()+/ ',
                tessedit_ocr_engine_mode: 1,
                tessedit_blacklist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
                textord_min_linesize: 2.0,
                textord_old_baselines: false
            } : 
            {
                tessedit_pageseg_mode: 6,
                tessedit_char_whitelist: '0123456789/- ', // ONLY NUMBERS AND SLASHES
            };
        
        try {
            const { data: { text } } = await Tesseract.recognize(
                blob,
                'eng',
                { 
                    logger: m => {
                        if (m.status === 'recognizing text') {
                            console.log(`OCR Progress: ${(m.progress * 100).toFixed(1)}%`);
                        }
                    },
                    ...ocrConfig
                }
            );

            console.log('OCR Result:', text);
            return this.paperMode ? 
                this.parsePaperNumbers(text) : 
                this.parseIDCardText(text);
                
        } catch (error) {
            console.error('OCR Processing Error:', error);
            return this.paperMode ? 
                this.parsePaperNumbers('') : 
                this.parseIDCardText('');
        }
    }

    async captureAndProcess() {
        if (!this.stream) return;
        
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
        this.ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        
        if (this.paperMode) {
            this.enhanceImageForPaperNumbers();
        }
        
        const imageData = this.canvas.toDataURL('image/jpeg');
        
        try {
            const result = await this.processImageWithOCR(imageData);
            
            if (this.paperMode) {
                const enhancedResult = this.enhancedParsePaperNumbers(result.rawText);
                this.handlePaperNumberResult(enhancedResult);
            } else {
                this.handleIDCardResult(result);
            }
            
        } catch (error) {
            console.error('OCR processing error:', error);
            this.updateStatus('❌ Processing error, continuing...', 'error');
        }
    }

    // ========== ID CARD PROCESSING - UPDATED TO ONLY DETECT NUMBERS WITH SLASH ==========

    parseIDCardText(text) {
        console.log('Raw OCR text:', text);
        
        const lines = text.split('\n').filter(line => line.trim().length > 2);
        let matricNumber = 'Not detected';

        for (const line of lines) {
            const trimmedLine = line.trim();
            
            // ONLY DETECT NUMBERS THAT CONTAIN A FORWARD SLASH
            if (matricNumber === 'Not detected') {
                // Pattern for aul/arc/24/013 or aul/mls/24/009 format - UPDATED WITH NEW DEPARTMENTS
                const aulPattern = trimmedLine.match(/(aul|AUL)\/(arc|ARC|mls|MLS|sms|SMS|nurs|NURS|law|LAW|sci|SCI|cmpi|CMPI|ift|IFT|mac|MAC|irs|IRS)\/\d{2}\/\d{3}/i);
                if (aulPattern) {
                    matricNumber = aulPattern[0].toLowerCase();
                    continue;
                }
                
                // Pattern for UXXXX/XXXXX format
                const uniMatric = trimmedLine.match(/(U|u)\d{4}\/\d{5,6}/);
                if (uniMatric) {
                    matricNumber = uniMatric[0].toUpperCase();
                    continue;
                }
                
                // Pattern for XX/XXXXX format (year/number)
                const yearMatric = trimmedLine.match(/\d{2}\/\d{5,6}/);
                if (yearMatric) {
                    matricNumber = yearMatric[0];
                    continue;
                }
                
                // Generic pattern for any text containing numbers and slashes
                const slashNumber = trimmedLine.match(/[a-zA-Z0-9]+\/[a-zA-Z0-9]+\/\d{2}\/\d+/);
                if (slashNumber) {
                    matricNumber = slashNumber[0];
                    continue;
                }
                
                // Any string that contains at least one slash and numbers
                const anySlashNumber = trimmedLine.match(/[a-zA-Z0-9]+\/[a-zA-Z0-9\/]+/);
                if (anySlashNumber && /\d/.test(anySlashNumber[0])) {
                    const candidate = anySlashNumber[0];
                    // Only accept if it has reasonable length and contains numbers
                    if (candidate.length >= 8 && candidate.length <= 20 && /\d/.test(candidate)) {
                        matricNumber = candidate;
                        continue;
                    }
                }
            }
        }

        return {
            matricNumber: matricNumber,
            rawText: text,
            timestamp: new Date().toLocaleString()
        };
    }

    handleIDCardResult(result) {
        // Only process if a valid matric number with slash was detected
        if (result.matricNumber !== 'Not detected' && result.matricNumber.includes('/')) {
            const department = this.detectDepartment(result.matricNumber);
            result.department = department;
            
            const isRegistered = this.checkIfRegistered(result);
            
            if (isRegistered) {
                this.displayRegisteredResult(result, isRegistered);
                this.saveRecord(result);
                this.updateStatus('✅ Registered student detected!', 'registered');
                
                // Play scan sound for successful scan
                this.playScanSound();
                
                // CHANGED: Reduced timeout for faster scanning
                setTimeout(() => {
                    this.updateStatus('🔄 Continuing scan (1.5s speed)...', 'scanning');
                }, 2000);
            } else {
                this.displayUnregisteredResult(result);
                this.saveRecord(result);
                this.updateStatus('✅ New student detected and registered', 'registered');
                
                // Play scan sound for successful scan
                this.playScanSound();
                
                // CHANGED: Reduced timeout for faster scanning
                setTimeout(() => {
                    this.updateStatus('🔄 Continuing scan (1.5s speed)...', 'scanning');
                }, 2000);
            }
        } else {
            this.updateStatus('🔍 Scanning for student ID cards (1.5s speed)...', 'scanning');
        }
    }

    // ========== PAPER NUMBER PROCESSING ==========

    enhancedParsePaperNumbers(text) {
        console.log('Raw OCR text for paper:', text);
        
        const lines = text.split('\n').filter(line => line.trim().length > 0);
        let detectedNumbers = [];
        
        // Only look for numbers that contain slashes in paper mode - UPDATED WITH NEW DEPARTMENTS
        const slashNumberPatterns = [
            /(aul|AUL)\/(arc|ARC|mls|MLS|sms|SMS|nurs|NURS|law|LAW|sci|SCI|cmpi|CMPI|ift|IFT|mac|MAC|irs|IRS)\/\d{2}\/\d{3}/gi,
            /(U|u)\d{4}\/\d{5,6}/g,
            /\d{2}\/\d{5,6}/g,
            /[a-zA-Z0-9]+\/[a-zA-Z0-9]+\/\d{2}\/\d+/g,
            /[a-zA-Z0-9]+\/[a-zA-Z0-9\/]+/g
        ];
        
        for (const line of lines) {
            const trimmedLine = line.trim();
            
            slashNumberPatterns.forEach(pattern => {
                const matches = trimmedLine.match(pattern);
                if (matches) {
                    // Filter to only include matches that have slashes and numbers
                    const validMatches = matches.filter(match => 
                        match.includes('/') && /\d/.test(match)
                    );
                    detectedNumbers.push(...validMatches);
                }
            });
        }
        
        const uniqueNumbers = [...new Set(detectedNumbers)]
            .filter(num => {
                const hasSlash = num.includes('/');
                const hasNumbers = /\d/.test(num);
                const totalLength = num.length;
                
                return hasSlash && hasNumbers && totalLength >= 8 && totalLength <= 25;
            })
            .slice(0, 10);

        console.log('Enhanced detected numbers with slashes:', uniqueNumbers);

        return {
            matricNumber: uniqueNumbers.length > 0 ? uniqueNumbers.join(', ') : 'No valid numbers detected',
            rawText: text,
            timestamp: new Date().toLocaleString(),
            numbers: uniqueNumbers,
            type: 'paper',
            department: 'PAPER'
        };
    }

    handlePaperNumberResult(result) {
        console.log('Paper result:', result);
        
        if (result.numbers && result.numbers.length > 0) {
            this.displayPaperNumberResult(result);
            this.saveRecord(result);
            this.updateStatus(`✅ Detected ${result.numbers.length} number(s) with slashes`, 'registered');
            
            // Play scan sound for paper detection
            this.playScanSound();
            
            // CHANGED: Reduced timeout for faster scanning
            setTimeout(() => {
                this.updateStatus('📄 Continuing paper scan (1.5s speed)...', 'scanning');
            }, 2000);
        } else {
            this.updateStatus('🔍 Scanning for numbers with slashes on paper (1.5s speed)...', 'scanning');
        }
    }

    enhanceImageForPaperNumbers() {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const contrast = 2.0;
            data[i] = this.clamp(((data[i] - 128) * contrast) + 128);
            data[i + 1] = this.clamp(((data[i + 1] - 128) * contrast) + 128);
            data[i + 2] = this.clamp(((data[i + 2] - 128) * contrast) + 128);
            
            const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            data[i] = data[i + 1] = data[i + 2] = gray;
            
            const threshold = 128;
            if (gray > threshold) {
                data[i] = data[i + 1] = data[i + 2] = 255;
            } else {
                data[i] = data[i + 1] = data[i + 2] = 0;
            }
        }
        
        this.ctx.putImageData(imageData, 0, 0);
    }

    clamp(value) {
        return Math.max(0, Math.min(255, value));
    }

    // ========== DATA MANAGEMENT METHODS ==========

    saveRecord(record) {
        if (record.type === 'paper') {
            const similarExists = this.allRecords.some(r => 
                r.type === 'paper' && 
                JSON.stringify(r.numbers) === JSON.stringify(record.numbers)
            );
            
            if (!similarExists) {
                this.allRecords.push(record);
                localStorage.setItem('studentRecords', JSON.stringify(this.allRecords));
            }
        } else {
            const exists = this.allRecords.some(r => 
                r.matricNumber === record.matricNumber
            );
            
            if (!exists) {
                this.allRecords.push(record);
                localStorage.setItem('studentRecords', JSON.stringify(this.allRecords));
            }
        }
        
        this.addToDepartment(record);
        this.updateRecordsDisplay();
        this.updateDepartmentTables();
    }

    addToDepartment(record) {
        const deptCode = record.department || 'OTHER';
        if (this.departments[deptCode]) {
            const dept = this.departments[deptCode];
            
            dept.records.push({
                ...record,
                scanTime: new Date().toLocaleString()
            });
            
            dept.count++;
            this.saveDepartmentData();
        }
    }

    // Department detection - UPDATED WITH NEW DEPARTMENTS
    detectDepartment(matricNumber) {
        if (!matricNumber || matricNumber === 'Not detected') return 'OTHER';
        
        const matricLower = matricNumber.toLowerCase();
        
        if (matricLower.includes('arc')) return 'ARC';
        if (matricLower.includes('cmpi')) return 'CMPI';
        if (matricLower.includes('mls')) return 'MLS';
        if (matricLower.includes('sms')) return 'SMS';
        if (matricLower.includes('nurs')) return 'NURS';
        if (matricLower.includes('law')) return 'LAW';
        if (matricLower.includes('sci')) return 'SCI';
        if (matricLower.includes('ift')) return 'IFT';
        if (matricLower.includes('mac')) return 'MAC';
        if (matricLower.includes('irs')) return 'IRS';
        
        return 'OTHER';
    }

    checkIfRegistered(scanResult) {
        if (scanResult.matricNumber === 'Not detected') {
            return false;
        }
        
        const foundByMatric = this.allRecords.find(record => 
            record.matricNumber === scanResult.matricNumber
        );
        
        return foundByMatric || false;
    }

    // ========== DISPLAY METHODS ==========

    displayRegisteredResult(scanResult, registeredRecord) {
        const record = registeredRecord || scanResult;
        const deptCode = record.department || 'OTHER';
        const deptName = this.departments[deptCode] ? this.departments[deptCode].name : deptCode;
        
        this.currentDataDiv.innerHTML = `
            <div class="record-item registered-person">
                <div class="registered-badge">✅ REGISTERED STUDENT</div>
                <div class="department-badge">${deptCode} - ${deptName}</div>
                <p><strong>Matric Number:</strong> ${record.matricNumber}</p>
                <p><strong>Department:</strong> ${deptName}</p>
                <p><strong>Status:</strong> Verified ✅</p>
                <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
                ${registeredRecord ? `<p><strong>First Registered:</strong> ${registeredRecord.timestamp}</p>` : ''}
                <div class="fast-scan-notice">⚡ Fast Scan Mode (1.5s)</div>
            </div>
        `;
        
        // CHANGED: Reduced timeout for faster scanning
        setTimeout(() => {
            if (this.isScanning) {
                this.currentDataDiv.innerHTML = '<p>Ready for next student scan (1.5s speed)...</p>';
            }
        }, 3000);
    }

    displayUnregisteredResult(scanResult) {
        const deptCode = scanResult.department || 'OTHER';
        const deptName = this.departments[deptCode] ? this.departments[deptCode].name : deptCode;
        
        this.currentDataDiv.innerHTML = `
            <div class="record-item unregistered-person">
                <div class="unregistered-badge">🎓 NEW STUDENT</div>
                <div class="department-badge">${deptCode} - ${deptName}</div>
                <p><strong>Matric Number:</strong> ${scanResult.matricNumber}</p>
                <p><strong>Department:</strong> ${deptName}</p>
                <p><strong>Status:</strong> Auto-registered</p>
                <p><strong>Time:</strong> ${scanResult.timestamp}</p>
                <p><em>New student added to system</em></p>
                <div class="fast-scan-notice">⚡ Fast Scan Mode (1.5s)</div>
            </div>
        `;
        
        // CHANGED: Reduced timeout for faster scanning
        setTimeout(() => {
            if (this.isScanning) {
                this.currentDataDiv.innerHTML = '<p>Ready for next student scan (1.5s speed)...</p>';
            }
        }, 2500);
    }

    updateRecordsDisplay() {
        if (this.allRecords.length === 0) {
            this.recordsList.innerHTML = '<p>No records yet. Scan ID cards or paper documents to build your database.</p>';
            return;
        }
        
        const sortedRecords = [...this.allRecords].sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );
        
        this.recordsList.innerHTML = sortedRecords.map(record => {
            if (record.type === 'paper') {
                const numbersPreview = record.numbers.slice(0, 3).join(', ') + 
                    (record.numbers.length > 3 ? `... (+${record.numbers.length - 3} more)` : '');
                
                return `
                    <div class="record-item paper-record">
                        <div class="department-tag paper-tag">PAPER</div>
                        <h4>📄 Paper Document</h4>
                        <p><strong>Numbers:</strong> ${numbersPreview}</p>
                        <p><strong>Total:</strong> ${record.numbers.length} numbers</p>
                        <p><strong>Scanned:</strong> ${record.timestamp}</p>
                    </div>
                `;
            } else {
                const deptCode = record.department || 'OTHER';
                const deptName = this.departments[deptCode] ? this.departments[deptCode].name : deptCode;
                
                return `
                    <div class="record-item">
                        <div class="department-tag">${deptCode}</div>
                        <p><strong>Matric Number:</strong> ${record.matricNumber}</p>
                        <p><strong>Department:</strong> ${deptName}</p>
                        <p><strong>Registered:</strong> ${record.timestamp}</p>
                    </div>
                `;
            }
        }).join('');
    }

    // ========== UTILITY METHODS ==========

    addStatusElement() {
        this.statusElement = document.createElement('div');
        this.statusElement.id = 'scanStatus';
        this.statusElement.className = 'scan-status';
        document.querySelector('.scanner-section').appendChild(this.statusElement);
    }

    updateStatus(message, type = 'info') {
        if (this.statusElement) {
            this.statusElement.textContent = message;
            this.statusElement.className = `scan-status status-${type}`;
        }
    }

    // ========== DEPARTMENT TABLE METHODS ==========

    createDepartmentTables() {
        const tablesContainer = document.createElement('div');
        tablesContainer.id = 'departmentTables';
        tablesContainer.className = 'department-tables';
        
        Object.keys(this.departments).forEach(deptCode => {
            if (deptCode !== 'OTHER' && deptCode !== 'PAPER') {
                const deptTable = this.createDepartmentTable(deptCode);
                tablesContainer.appendChild(deptTable);
            }
        });
        
        const summaryTable = this.createSummaryTable();
        tablesContainer.appendChild(summaryTable);
        
        document.querySelector('.saved-records').insertBefore(tablesContainer, this.recordsList);
    }

    createDepartmentTable(deptCode) {
        const tableContainer = document.createElement('div');
        tableContainer.className = 'department-table-container';
        tableContainer.id = `table-${deptCode}`;
        
        const dept = this.departments[deptCode];
        
        tableContainer.innerHTML = `
            <div class="table-header">
                <h3>${dept.name} (${deptCode})</h3>
                <span class="count-badge">${dept.count} scans</span>
                <div class="table-actions">
                    <button class="copy-dept-btn" onclick="window.idScanner.copyDepartmentRecords('${deptCode}')">
                        📋 Copy
                    </button>
                    <button class="print-dept-btn" onclick="window.idScanner.printDepartment('${deptCode}')">
                        🖨️ Print
                    </button>
                </div>
            </div>
            <table class="department-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Matric Number</th>
                        <th>Scan Time</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody id="tbody-${deptCode}">
                    <!-- Records will be populated here -->
                </tbody>
            </table>
        `;
        
        return tableContainer;
    }

    createSummaryTable() {
        const tableContainer = document.createElement('div');
        tableContainer.className = 'summary-table-container';
        
        tableContainer.innerHTML = `
            <div class="table-header">
                <h3>📊 Department Summary</h3>
                <button class="copy-summary-btn" onclick="window.idScanner.copySummary()">
                    📋 Copy Summary
                </button>
            </div>
            <table class="summary-table">
                <thead>
                    <tr>
                        <th>Department</th>
                        <th>Code</th>
                        <th>Total Scans</th>
                        <th>Unique Students</th>
                        <th>Last Scan</th>
                    </tr>
                </thead>
                <tbody id="summary-tbody">
                    <!-- Summary will be populated here -->
                </tbody>
            </table>
        `;
        
        return tableContainer;
    }

    updateDepartmentTables() {
        Object.keys(this.departments).forEach(deptCode => {
            if (deptCode !== 'OTHER' && deptCode !== 'PAPER') {
                this.updateDepartmentTable(deptCode);
            }
        });
        
        this.updateSummaryTable();
        this.updateRecordsPage();
    }

    updateDepartmentTable(deptCode) {
        const tbody = document.getElementById(`tbody-${deptCode}`);
        const dept = this.departments[deptCode];
        
        if (!tbody) return;
        
        if (dept.records.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" class="no-data">No scans recorded</td></tr>`;
            return;
        }
        
        tbody.innerHTML = dept.records.map((record, index) => {
            const scanCount = this.getStudentScanCount(record.matricNumber, deptCode);
            
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${record.matricNumber}</td>
                    <td>${record.timestamp}</td>
                    <td>
                        <span class="mark-badge">${scanCount} mark${scanCount !== 1 ? 's' : ''}</span>
                    </td>
                </tr>
            `;
        }).join('');
    }

    updateSummaryTable() {
        const tbody = document.getElementById('summary-tbody');
        
        if (!tbody) return;
        
        const summaryRows = Object.keys(this.departments)
            .filter(deptCode => deptCode !== 'OTHER' && deptCode !== 'PAPER')
            .map(deptCode => {
            const dept = this.departments[deptCode];
            const uniqueStudents = this.getUniqueStudentCount(deptCode);
            const lastScan = this.getLastScanTime(deptCode);
            
            return `
                <tr>
                    <td>${dept.name}</td>
                    <td>${deptCode}</td>
                    <td>
                        <span class="scan-count">${dept.count}</span>
                    </td>
                    <td>
                        <span class="student-count">${uniqueStudents}</span>
                    </td>
                    <td>${lastScan || 'No scans'}</td>
                </tr>
            `;
        }).join('');
        
        tbody.innerHTML = summaryRows;
    }

    getStudentScanCount(matricNumber, deptCode) {
        const dept = this.departments[deptCode];
        return dept.records.filter(record => record.matricNumber === matricNumber).length;
    }

    getUniqueStudentCount(deptCode) {
        const dept = this.departments[deptCode];
        const uniqueMatrics = new Set(dept.records.map(record => record.matricNumber));
        return uniqueMatrics.size;
    }

    getLastScanTime(deptCode) {
        const dept = this.departments[deptCode];
        if (dept.records.length === 0) return null;
        
        const sortedRecords = [...dept.records].sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );
        
        return sortedRecords[0].timestamp;
    }

    // ========== PRINT DEPARTMENT METHOD ==========

    printDepartment(deptCode) {
        const dept = this.departments[deptCode];
        if (!dept || dept.records.length === 0) {
            alert(`No records found for ${dept.name}`);
            return;
        }
        
        // Create print-friendly HTML
        const printHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${dept.name} - Student Records</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        margin: 20px;
                        color: #000;
                    }
                    .print-header { 
                        text-align: center; 
                        margin-bottom: 20px;
                        border-bottom: 2px solid #000;
                        padding-bottom: 10px;
                    }
                    .print-header h1 { 
                        margin: 0; 
                        font-size: 24px;
                    }
                    .print-header .subtitle {
                        font-size: 16px;
                        color: #666;
                    }
                    .print-table { 
                        width: 100%; 
                        border-collapse: collapse; 
                        margin-top: 15px;
                    }
                    .print-table th { 
                        background: #f8f9fa; 
                        border: 1px solid #000;
                        padding: 10px; 
                        text-align: left;
                        font-weight: bold;
                    }
                    .print-table td { 
                        border: 1px solid #000;
                        padding: 8px 10px; 
                    }
                    .print-summary {
                        margin-top: 20px;
                        padding: 15px;
                        background: #f8f9fa;
                        border: 1px solid #000;
                    }
                    .print-footer {
                        margin-top: 30px;
                        text-align: center;
                        font-size: 12px;
                        color: #666;
                    }
                    @media print {
                        body { margin: 0; }
                        .print-header { margin-top: 0; }
                    }
                </style>
            </head>
            <body>
                <div class="print-header">
                    <h1>${dept.name} Department</h1>
                    <div class="subtitle">Student Attendance Records</div>
                    <div class="subtitle">Generated on: ${new Date().toLocaleString()}</div>
                </div>
                
                <div class="print-summary">
                    <strong>Summary:</strong> ${dept.count} total scans • ${this.getUniqueStudentCount(deptCode)} unique students
                </div>
                
                <table class="print-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Matric Number</th>
                            <th>Scan Time</th>
                            <th>Attendance Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.generatePrintTableRows(deptCode)}
                    </tbody>
                </table>
                
                <div class="print-footer">
                    Generated by ID Card Scanner System
                </div>
            </body>
            </html>
        `;
        
        // Open print window
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        printWindow.document.write(printHTML);
        printWindow.document.close();
        
        // Wait for content to load then print
        printWindow.onload = function() {
            printWindow.print();
            // Optional: close window after printing
            // printWindow.close();
        };
    }

    // ========== HELPER METHOD FOR PRINTING ==========

    generatePrintTableRows(deptCode) {
        const dept = this.departments[deptCode];
        const uniqueStudents = this.getUniqueStudentsByDepartment(deptCode);
        
        return uniqueStudents.map((student, index) => {
            const studentRecords = dept.records.filter(record => record.matricNumber === student);
            const firstScan = studentRecords[0];
            const scanCount = studentRecords.length;
            
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${student}</td>
                    <td>${firstScan.timestamp}</td>
                    <td>${scanCount}</td>
                </tr>
            `;
        }).join('');
    }

    // ========== GET UNIQUE STUDENTS BY DEPARTMENT ==========

    getUniqueStudentsByDepartment(deptCode) {
        const dept = this.departments[deptCode];
        return [...new Set(dept.records.map(record => record.matricNumber))];
    }

    // ========== RECORDS PAGE METHODS ==========

    createRecordsPageLink() {
        // This method is called in constructor to set up the records page functionality
        const viewRecordsBtn = document.getElementById('viewRecordsBtn');
        if (viewRecordsBtn) {
            viewRecordsBtn.addEventListener('click', () => {
                this.openRecordsPage();
            });
        }
    }

    openRecordsPage() {
        // Create and open the records page
        const recordsPageHTML = this.generateRecordsPageHTML();
        const recordsWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes');
        
        if (recordsWindow) {
            recordsWindow.document.write(recordsPageHTML);
            recordsWindow.document.close();
            
            // Add event listener for when the window loads
            recordsWindow.onload = () => {
                this.initializeRecordsPage(recordsWindow);
            };
        } else {
            alert('Please allow pop-ups for this website to view records');
        }
    }

    generateRecordsPageHTML() {
        const studentRecords = JSON.parse(localStorage.getItem('studentRecords') || '[]');
        const departmentRecords = JSON.parse(localStorage.getItem('departmentRecords') || '{}');
        
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Student Records - ID Card Scanner</title>
                <style>
                    ${this.getRecordsPageStyles()}
                </style>
            </head>
            <body>
                <div class="records-page">
                    <header class="records-header">
                        <h1>📊 Student Records</h1>
                        <div class="header-actions">
                            <button onclick="window.print()" class="print-btn">🖨️ Print</button>
                            <button onclick="copyAllRecords()" class="copy-btn">📋 Copy All</button>
                            <button onclick="window.close()" class="back-btn">← Back to Scanner</button>
                        </div>
                    </header>

                    <div class="stats-overview">
                        <div class="stat-card">
                            <h3>Total Scans</h3>
                            <span class="stat-number">${this.getTotalScans(departmentRecords)}</span>
                        </div>
                        <div class="stat-card">
                            <h3>Unique Students</h3>
                            <span class="stat-number">${this.getUniqueStudents(studentRecords)}</span>
                        </div>
                        <div class="stat-card">
                            <h3>Departments</h3>
                            <span class="stat-number">${this.getActiveDepartments(departmentRecords)}</span>
                        </div>
                        <div class="stat-card">
                            <h3>Last Updated</h3>
                            <span class="stat-date">${new Date().toLocaleString()}</span>
                        </div>
                    </div>

                    <div class="department-section">
                        <h2>Department Records</h2>
                        <div class="department-tabs" id="departmentTabs">
                            ${this.generateDepartmentTabs(departmentRecords)}
                        </div>
                        
                        <div class="tab-content">
                            ${this.generateDepartmentPanes(departmentRecords)}
                        </div>
                    </div>

                    <div class="all-records-section">
                        <h2>All Scanned Records</h2>
                        <div class="search-container">
                            <input type="text" id="searchInput" placeholder="🔍 Search records..." onkeyup="searchRecords()">
                        </div>
                        <div class="table-container">
                            <table class="all-records-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Matric Number</th>
                                        <th>Department</th>
                                        <th>Scan Time</th>
                                        <th>Marks</th>
                                    </tr>
                                </thead>
                                <tbody id="all-records-body">
                                    ${this.generateAllRecordsHTML(studentRecords, departmentRecords)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <script>
                    // Show first department by default
                    document.addEventListener('DOMContentLoaded', function() {
                        showDepartment('ARC');
                    });

                    function showDepartment(deptCode) {
                        // Hide all tab panes
                        document.querySelectorAll('.tab-pane').forEach(pane => {
                            pane.style.display = 'none';
                        });
                        
                        // Show selected tab pane
                        const selectedPane = document.getElementById('tab-' + deptCode);
                        if (selectedPane) {
                            selectedPane.style.display = 'block';
                        }
                        
                        // Update active tab button
                        document.querySelectorAll('.tab-btn').forEach(btn => {
                            btn.classList.remove('active');
                        });
                        event.target.classList.add('active');
                    }

                    function copyAllRecords() {
                        const studentRecords = ${JSON.stringify(studentRecords)};
                        let text = "Matric Number\\tDepartment\\tScan Time\\tMarks\\n";
                        
                        studentRecords.forEach(record => {
                            const totalMarks = getTotalStudentScanCount(record.matricNumber, ${JSON.stringify(departmentRecords)});
                            text += \`\${record.matricNumber}\\t\${record.department || 'OTHER'}\\t\${record.timestamp}\\t\${totalMarks}\\n\`;
                        });
                        
                        navigator.clipboard.writeText(text).then(() => {
                            alert('All records copied to clipboard!');
                        });
                    }

                    function searchRecords() {
                        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
                        const rows = document.querySelectorAll('.all-records-table tbody tr');
                        
                        rows.forEach(row => {
                            const text = row.textContent.toLowerCase();
                            row.style.display = text.includes(searchTerm) ? '' : 'none';
                        });
                    }

                    // Function to calculate total scan count for a student across all departments
                    function getTotalStudentScanCount(matricNumber, departmentRecordsJson) {
                        const departmentRecords = JSON.parse(departmentRecordsJson);
                        let totalCount = 0;
                        Object.keys(departmentRecords).forEach(deptCode => {
                            const dept = departmentRecords[deptCode];
                            if (dept && dept.records) {
                                totalCount += dept.records.filter(record => record.matricNumber === matricNumber).length;
                            }
                        });
                        return totalCount;
                    }
                <\/script>
            </body>
            </html>
        `;
    }

    getRecordsPageStyles() {
        return `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: #f5f5f5;
                color: #333;
                line-height: 1.6;
            }
            
            .records-page {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
            }
            
            .records-header {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                margin-bottom: 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 15px;
            }
            
            .records-header h1 {
                color: #2c3e50;
                font-size: 2em;
            }
            
            .header-actions {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .print-btn, .copy-btn, .back-btn {
                padding: 10px 15px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-decoration: none;
                font-size: 0.9em;
                transition: all 0.3s;
            }
            
            .print-btn {
                background: #3498db;
                color: white;
            }
            
            .print-btn:hover {
                background: #2980b9;
            }
            
            .copy-btn {
                background: #27ae60;
                color: white;
            }
            
            .copy-btn:hover {
                background: #219a52;
            }
            
            .back-btn {
                background: #95a5a6;
                color: white;
            }
            
            .back-btn:hover {
                background: #7f8c8d;
            }
            
            .stats-overview {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-bottom: 30px;
            }
            
            .stat-card {
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                text-align: center;
                transition: transform 0.3s;
            }
            
            .stat-card:hover {
                transform: translateY(-5px);
            }
            
            .stat-card h3 {
                color: #7f8c8d;
                font-size: 0.9em;
                margin-bottom: 10px;
            }
            
            .stat-number {
                font-size: 2em;
                font-weight: bold;
                color: #2c3e50;
            }
            
            .stat-date {
                font-size: 1.1em;
                color: #27ae60;
                font-weight: bold;
            }
            
            .department-section {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                margin-bottom: 20px;
            }
            
            .department-tabs {
                display: flex;
                gap: 5px;
                margin-bottom: 20px;
                flex-wrap: wrap;
            }
            
            .tab-btn {
                padding: 10px 15px;
                border: none;
                background: #ecf0f1;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .tab-btn.active {
                background: #3498db;
                color: white;
            }
            
            .tab-btn:hover:not(.active) {
                background: #d5dbdb;
            }
            
            .tab-pane {
                display: none;
            }
            
            .table-container {
                overflow-x: auto;
                margin-top: 15px;
            }
            
            .records-table, .all-records-table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }
            
            .records-table th, .all-records-table th {
                background: #34495e;
                color: white;
                padding: 12px;
                text-align: left;
                font-weight: 600;
            }
            
            .records-table td, .all-records-table td {
                padding: 12px;
                border-bottom: 1px solid #ecf0f1;
            }
            
            .records-table tr:hover, .all-records-table tr:hover {
                background: #f8f9fa;
            }
            
            .mark-badge {
                background: #e67e22;
                color: white;
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 0.8em;
                font-weight: bold;
            }
            
            .all-records-section {
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            
            .search-container {
                margin-bottom: 15px;
            }
            
            .search-container input {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 1em;
            }
            
            .no-records {
                text-align: center;
                padding: 50px;
                color: #7f8c8d;
            }
            
            .no-data {
                text-align: center;
                color: #7f8c8d;
                font-style: italic;
                padding: 20px;
            }
            
            @media print {
                .header-actions, .department-tabs, .search-container {
                    display: none;
                }
                
                .records-page {
                    box-shadow: none;
                }
                
                body {
                    background: white;
                }
            }
            
            @media (max-width: 768px) {
                .records-header {
                    flex-direction: column;
                    text-align: center;
                }
                
                .stats-overview {
                    grid-template-columns: 1fr 1fr;
                }
                
                .department-tabs {
                    justify-content: center;
                }
            }
        `;
    }

    generateDepartmentTabs(departmentRecords) {
        const departments = {
            'ARC': 'Architecture',
            'CMPI': 'Computer Science',
            'MLS': 'Medical Lab Science',
            'SMS': 'School of Management',
            'NURS': 'Nursing',
            'LAW': 'Law',
            'SCI': 'Science',
            'IFT': 'Information Technology',
            'MAC': 'Mass Communication',
            'IRS': 'International Relations'
        };

        return Object.keys(departments).map(deptCode => {
            const dept = departmentRecords[deptCode] || { count: 0 };
            return `
                <button class="tab-btn" onclick="showDepartment('${deptCode}')">
                    ${departments[deptCode]} (${dept.count || 0})
                </button>
            `;
        }).join('');
    }

    generateDepartmentPanes(departmentRecords) {
        const departments = {
            'ARC': 'Architecture',
            'CMPI': 'Computer Science',
            'MLS': 'Medical Lab Science',
            'SMS': 'School of Management',
            'NURS': 'Nursing',
            'LAW': 'Law',
            'SCI': 'Science',
            'IFT': 'Information Technology',
            'MAC': 'Mass Communication',
            'IRS': 'International Relations'
        };

        return Object.keys(departments).map(deptCode => {
            const dept = departmentRecords[deptCode] || { records: [] };
            const records = dept.records || [];
            
            return `
                <div id="tab-${deptCode}" class="tab-pane">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                        <h3>${departments[deptCode]} - ${dept.count || 0} scans</h3>
                        <button onclick="window.opener.idScanner.printDepartment('${deptCode}')" 
                                class="print-btn" style="padding: 8px 12px; font-size: 0.9em;">
                            🖨️ Print This Department
                        </button>
                    </div>
                    <div class="table-container">
                        <table class="records-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Matric Number</th>
                                    <th>Scan Time</th>
                                    <th>Marks</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${records.length > 0 ? 
                                    records.map((record, index) => `
                                        <tr>
                                            <td>${index + 1}</td>
                                            <td>${record.matricNumber || 'N/A'}</td>
                                            <td>${record.timestamp || 'N/A'}</td>
                                            <td><span class="mark-badge">${this.getStudentScanCount(records, record.matricNumber)} mark${this.getStudentScanCount(records, record.matricNumber) !== 1 ? 's' : ''}</span></td>
                                        </tr>
                                    `).join('') : 
                                    '<tr><td colspan="4" class="no-data">No records found</td></tr>'
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }).join('');
    }

    getStudentScanCount(records, matricNumber) {
        return records.filter(record => record.matricNumber === matricNumber).length;
    }

    generateAllRecordsHTML(studentRecords, departmentRecords) {
        if (!studentRecords.length) {
            return '<tr><td colspan="5" class="no-data">No records found. Scan some ID cards first.</td></tr>';
        }

        return studentRecords.map((record, index) => {
            const deptCode = record.department || 'OTHER';
            const deptName = departmentRecords[deptCode]?.name || deptCode;
            const totalMarks = this.getTotalStudentScanCount(record.matricNumber, departmentRecords);
            
            return `
                <tr>
                    <td>${index + 1}</td>
                    <td>${record.matricNumber}</td>
                    <td>${deptName}</td>
                    <td>${record.timestamp}</td>
                    <td><span class="mark-badge">${totalMarks} mark${totalMarks !== 1 ? 's' : ''}</span></td>
                </tr>
            `;
        }).join('');
    }

    getTotalStudentScanCount(matricNumber, departmentRecords) {
        let totalCount = 0;
        Object.keys(departmentRecords).forEach(deptCode => {
            const dept = departmentRecords[deptCode];
            if (dept && dept.records) {
                totalCount += dept.records.filter(record => record.matricNumber === matricNumber).length;
            }
        });
        return totalCount;
    }

    getTotalScans(departmentRecords) {
        return Object.values(departmentRecords).reduce((total, dept) => total + (dept.count || 0), 0);
    }

    getUniqueStudents(studentRecords) {
        const uniqueMatrics = new Set(studentRecords.map(record => record.matricNumber));
        return uniqueMatrics.size;
    }

    getActiveDepartments(departmentRecords) {
        return Object.values(departmentRecords).filter(dept => dept.count > 0 && dept.name !== 'Paper Numbers').length;
    }

    initializeRecordsPage(recordsWindow) {
        // Additional initialization for records page if needed
        console.log('Records page initialized');
    }

    // ========== DATA PERSISTENCE METHODS ==========

    loadSavedRecords() {
        const saved = localStorage.getItem('studentRecords');
        if (saved) {
            this.allRecords = JSON.parse(saved);
            this.updateRecordsDisplay();
        }
        
        this.loadDepartmentData();
        this.updateDepartmentTables();
    }

    saveDepartmentData() {
        localStorage.setItem('departmentRecords', JSON.stringify(this.departments));
    }

    loadDepartmentData() {
        const saved = localStorage.getItem('departmentRecords');
        if (saved) {
            const savedData = JSON.parse(saved);
            Object.keys(savedData).forEach(deptCode => {
                if (this.departments[deptCode]) {
                    this.departments[deptCode] = savedData[deptCode];
                }
            });
        }
    }

    updateRecordsPage() {
        const recordsPageData = {
            allRecords: this.allRecords,
            departments: this.departments,
            lastUpdated: new Date().toISOString()
        };
        
        localStorage.setItem('recordsPageData', JSON.stringify(recordsPageData));
    }

    // ========== MANUAL ENTRY METHODS ==========

    handleManualEntry(e) {
        e.preventDefault();
        
        const matricInput = document.getElementById('matricInput');
        const matricValue = matricInput.value.trim();
        
        // Validate that manual entry also contains a slash
        if (!matricValue.includes('/')) {
            alert('Please enter a valid matric number with slash (e.g., aul/arc/24/013)');
            return;
        }
        
        const manualRecord = {
            matricNumber: matricValue,
            timestamp: new Date().toLocaleString(),
            source: 'manual'
        };
        
        manualRecord.department = this.detectDepartment(manualRecord.matricNumber);
        
        this.saveRecord(manualRecord);
        this.displayRegisteredResult(manualRecord);
        
        // Play scan sound for manual entry
        this.playScanSound();
        
        matricInput.value = '';
    }

    // ========== COPY FUNCTIONALITY METHODS ==========

    addCopyFunctionality() {
        const copyAllBtn = document.createElement('button');
        copyAllBtn.textContent = '📋 Copy All Records';
        copyAllBtn.className = 'copy-btn';
        copyAllBtn.onclick = () => this.copyAllRecords();
        
        const copyDeptBtn = document.createElement('button');
        copyDeptBtn.textContent = '📊 Copy Department Data';
        copyDeptBtn.className = 'copy-btn';
        copyDeptBtn.onclick = () => this.copyDepartmentData();
        
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'copy-buttons';
        buttonContainer.appendChild(copyAllBtn);
        buttonContainer.appendChild(copyDeptBtn);
        
        document.querySelector('.saved-records').insertBefore(buttonContainer, this.recordsList);
    }

    copyAllRecords() {
        const text = this.allRecords.map(record => 
            `${record.matricNumber}\t${record.department}\t${record.timestamp}`
        ).join('\n');
        
        const header = "Matric Number\tDepartment\tTimestamp\n";
        this.copyToClipboard(header + text);
        this.showCopyMessage('All records copied to clipboard!');
    }

    copyDepartmentData() {
        const text = Object.keys(this.departments)
            .filter(deptCode => deptCode !== 'OTHER' && deptCode !== 'PAPER')
            .map(deptCode => {
            const dept = this.departments[deptCode];
            return `${dept.name}\t${deptCode}\t${dept.count}\t${this.getUniqueStudentCount(deptCode)}`;
        }).join('\n');
        
        const header = "Department\tCode\tTotal Scans\tUnique Students\n";
        this.copyToClipboard(header + text);
        this.showCopyMessage('Department data copied to clipboard!');
    }

    copyDepartmentRecords(deptCode) {
        const dept = this.departments[deptCode];
        const text = dept.records.map((record, index) => 
            `${index + 1}\t${record.matricNumber}\t${record.timestamp}\t${this.getStudentScanCount(record.matricNumber, deptCode)}`
        ).join('\n');
        
        const header = "#\tMatric Number\tTimestamp\tMarks\n";
        this.copyToClipboard(header + text);
        this.showCopyMessage(`${dept.name} records copied to clipboard!`);
    }

    copySummary() {
        const text = Object.keys(this.departments)
            .filter(deptCode => deptCode !== 'OTHER' && deptCode !== 'PAPER')
            .map(deptCode => {
            const dept = this.departments[deptCode];
            const uniqueStudents = this.getUniqueStudentCount(deptCode);
            const lastScan = this.getLastScanTime(deptCode);
            
            return `${dept.name}\t${deptCode}\t${dept.count}\t${uniqueStudents}\t${lastScan || 'No scans'}`;
        }).join('\n');
        
        const header = "Department\tCode\tTotal Scans\tUnique Students\tLast Scan\n";
        this.copyToClipboard(header + text);
        this.showCopyMessage('Summary copied to clipboard!');
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text).catch(() => {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        });
    }

    showCopyMessage(message) {
        const msg = document.createElement('div');
        msg.className = 'copy-message';
        msg.textContent = message;
        msg.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            z-index: 1000;
        `;
        
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 2000);
    }

    displayPaperNumberResult(result) {
        const numbersList = result.numbers.map(num => 
            `<div class="paper-number-item">${num}</div>`
        ).join('');
        
        this.currentDataDiv.innerHTML = `
            <div class="record-item paper-document">
                <div class="paper-badge">📄 PAPER DOCUMENT</div>
                <h4>Detected Numbers with Slashes</h4>
                <div class="numbers-container">
                    ${numbersList}
                </div>
                <p><strong>Total Numbers:</strong> ${result.numbers.length}</p>
                <p><strong>Time:</strong> ${result.timestamp}</p>
                <p><em>Numbers saved to records</em></p>
                <div class="fast-scan-notice">⚡ Fast Scan Mode (1.5s)</div>
            </div>
        `;
        
        // CHANGED: Reduced timeout for faster scanning
        setTimeout(() => {
            if (this.isScanning) {
                this.currentDataDiv.innerHTML = '<p>Ready for next scan (1.5s speed)...</p>';
            }
        }, 3000);
    }
}

// Initialize the scanner when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the main scanner
    window.idScanner = new IDCardScanner();
});

// Clean up when page unloads
window.addEventListener('beforeunload', () => {
    if (window.idScanner) {
        window.idScanner.stopCamera();
    }
});