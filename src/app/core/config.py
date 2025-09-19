from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    api_host: str = '127.0.0.1'
    api_port: int = 5000

    postgres_port: int = 5432
    postgres_db: str
    postgres_user: str
    postgres_password: str

settings = Settings()
