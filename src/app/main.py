import uvicorn
from src.app.core.config import settings

if __name__ == "__main__":
    uvicorn.run(
        "src.app.app:app",
        host=settings.server_host,
        port=settings.server_port,
        reload=True
    )