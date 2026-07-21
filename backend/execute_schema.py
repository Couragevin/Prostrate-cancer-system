import os
import psycopg2
from dotenv import load_dotenv

def execute_schema():
    load_dotenv()
    database_url = os.environ.get("DATABASE_URL")
    if not database_url:
        print("DATABASE_URL not found in .env")
        return

    # Read the schema file
    schema_path = r"C:\Users\HP\.gemini\antigravity-ide\brain\af1eb609-614c-47c6-8f0e-a9701e4e2bb9\schema.sql"
    with open(schema_path, "r") as f:
        sql_commands = f.read()

    try:
        conn = psycopg2.connect(database_url)
        conn.autocommit = True
        cursor = conn.cursor()
        print("Executing schema...")
        cursor.execute(sql_commands)
        print("Schema executed successfully.")
        cursor.close()
        conn.close()
    except Exception as e:
        print(f"Error executing schema: {e}")

if __name__ == "__main__":
    execute_schema()
