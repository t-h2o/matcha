from flask import Flask, jsonify
import os
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)


def get_db_connection():
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    return conn


@app.route("/")
def hello_world():
    return "<h1>Hello, World!</h1>"


@app.route("/test")
def test():
    conn = get_db_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT * FROM test LIMIT 1")
            test_data = cur.fetchone()
            if test_data:
                return f"<h1>{test_data['content']}</h1>"
            else:
                return "<h1>error: No test data found</h1>"
    finally:
        conn.close()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
