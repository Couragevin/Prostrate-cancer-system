import psycopg2
from psycopg2 import pool
from app.core.config import settings

# Global connection pool
connection_pool = None

def init_pool():
    global connection_pool
    if connection_pool is None:
        try:
            connection_pool = pool.SimpleConnectionPool(
                1, 10,
                settings.DATABASE_URL
            )
            print("Database connection pool initialized.")
        except (Exception, psycopg2.DatabaseError) as error:
            print("Error while connecting to PostgreSQL", error)
            connection_pool = None

def close_pool():
    global connection_pool
    if connection_pool:
        connection_pool.closeall()
        print("Database connection pool closed.")
        connection_pool = None

def get_db_connection():
    """
    Yields a database connection from the pool.
    """
    if not connection_pool:
        raise ValueError("Database connection pool is not initialized.")
        
    conn = connection_pool.getconn()
    try:
        yield conn
    finally:
        connection_pool.putconn(conn)
