from pydantic_settings import BaseSettings
from dotenv import find_dotenv, load_dotenv


load_dotenv(find_dotenv("../../../.env"))

class Settings(BaseSettings):
    server_host: str = '127.0.0.1'
    server_port: int = 5001
    db_url: str

    class Config:
        env_file = '.env'

settings = Settings()
