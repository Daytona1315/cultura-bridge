from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

from src.app.core.config import settings as stg


postgres_url: str = f'postgresql+asyncpg://\
{stg.postgres_user}:\
{stg.postgres_password}@db:\
{stg.postgres_port}/\
{stg.postgres_db}'

engine = create_async_engine(
    url=postgres_url,
    echo=False,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
)

SessionFactory = async_sessionmaker(
    engine,
    expire_on_commit=False,
    class_=AsyncSession,
)
