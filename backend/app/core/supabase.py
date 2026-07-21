import psycopg2
from psycopg2 import pool
from app.core.config import settings

# Create a connection pool
try:
    connection_pool = pool.SimpleConnectionPool(
        1, 10,
        settings.DATABASE_URL
    )
except (Exception, psycopg2.DatabaseError) as error:
    print("Error while connecting to PostgreSQL", error)
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
