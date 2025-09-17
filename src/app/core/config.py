from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Pydantic v2+ использует model_config как словарь
    model_config = SettingsConfigDict(
        env_file="api.env",            # Имя файла, который нужно искать
        env_file_encoding="utf-8",  # Явно указываем кодировку
        extra="ignore"              # Игнорировать лишние переменные в .env
    )

    # --- Переменные с дефолтными значениями (можно переопределить в .env)
    server_host: str = '127.0.0.1'
    server_port: int = 5001
    db_port: int = 5432
    db_name: str = 'mydb'

    # --- Обязательные переменные (должны быть в .env или в переменных окружения)
    db_user: str
    db_password: str

settings = Settings()
