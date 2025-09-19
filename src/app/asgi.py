from src.app.utils.logging import setup_logging
from src.app.main import create_app


logger = setup_logging()
app = create_app()