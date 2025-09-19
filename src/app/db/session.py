from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from src.app.db.engine import SessionFactory

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with SessionFactory() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
