import  logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from sqlalchemy import text

from src.app.db.engine import engine

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting up...")
    logger.info("Checking database connection...")
    try:
        async with engine.begin() as conn:
            await conn.execute(text("SELECT 1"))
        logger.info("Connection established!")
    except Exception as e:
        logger.error(f"Failed to connect: {e}")
        raise RuntimeError from e

    yield

    logger.info("Shutting down...")
    await engine.dispose()


def create_app() -> FastAPI:
    app = FastAPI(
        title="MyApp",
        lifespan=lifespan,
    )

    return app


