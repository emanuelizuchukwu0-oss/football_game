

from flask import Flask, render_template
from flask_socketio import SocketIO, send
import requests  # ✅ for Paystack API calls

# Flask setup
app = Flask(__name__, template_folder="frontend", static_folder="static")
app.config['SECRET_KEY'] = "secret123"

# SocketIO setup
socketio = SocketIO(app, cors_allowed_origins="*")

# ✅ Paystack Secret Key (Test Mode for now)
PAYSTACK_SECRET_KEY = "sk_test_66406f3ab66b22bd2d3ec8bbbb609e70371949f6"  # paste your real test secret key here


# Routes
@app.route("/")
def index():
    return render_template("index.html")

@app.route("/admin")
def admin():
    return render_template("admin.html")

@app.route("/payment")
def payment():
    return render_template("payment.html")

@app.route("/chat")
def chat():
    return render_template("chat.html")

@app.route("/game")
def game():
    return "<h1>🎮 Welcome! Payment Successful. Game Unlocked.</h1>"


# ✅ Verify Payment Route
@app.route("/verify/<reference>")
def verify_payment(reference):
    url = f"https://api.paystack.co/transaction/verify/{reference}"
    headers = {
        "Authorization": f"Bearer {PAYSTACK_SECRET_KEY}",
        "Content-Type": "application/json",
    }

    response = requests.get(url, headers=headers)
    result = response.json()

    if result["status"] and result["data"]["status"] == "success":
        return {"status": "success", "data": result["data"]}
    else:
        return {"status": "failed", "data": result}


# Handle chat messages
@socketio.on("message")
def handle_message(msg):
    print("📩 Message:", msg)
    # Send to everyone else, but not back to the sender
    send(msg, broadcast=True, include_self=False)


# Run server with SocketIO
if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)
