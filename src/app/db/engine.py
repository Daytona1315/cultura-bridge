from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker

from src.app.core.config import settings as stg


engine = create_async_engine(
    url=f"postgresql+asyncpg://{stg.db_user}:{stg.db_password}@localhost:{stg.db_port}/{stg.db_name}",
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
