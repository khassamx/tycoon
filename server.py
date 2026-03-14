from flask import Flask, request, jsonify, send_from_directory
import json

app = Flask(__name__, static_folder="static")

FILE = "progreso.json"

def cargar():
    try:
        with open(FILE,"r") as f:
            return json.load(f)
    except:
        return {"dinero":0}

def guardar(data):
    with open(FILE,"w") as f:
        json.dump(data,f)

@app.route("/")
def home():
    return send_from_directory("static","index.html")

@app.route("/save", methods=["POST"])
def save():
    data = request.json
    guardar(data)
    return jsonify({"status":"guardado"})

@app.route("/load")
def load():
    return jsonify(cargar())

app.run(host="0.0.0.0", port=5000)