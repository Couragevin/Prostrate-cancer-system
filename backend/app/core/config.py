import json
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "Prostate Cancer Risk Stratification API"
    API_V1_STR: str = "/api/v1"

    # Accepts either a JSON list or a comma-separated string, e.g.
    #   BACKEND_CORS_ORIGINS='["http://localhost:3000","https://app.vercel.app"]'
    #   BACKEND_CORS_ORIGINS=http://localhost:3000,https://app.vercel.app
    # Kept as a raw string so pydantic-settings does not force JSON decoding,
    # and so origins are never URL-normalised. Starlette compares the browser's
    # Origin header byte-for-byte, and a normalised URL grows a trailing slash
    # ("http://localhost:3000/") that can never match a real Origin header.
    BACKEND_CORS_ORIGINS: str = ""

    DATABASE_URL: str = ""
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""

    # extra="ignore" so unrelated keys in .env (HF_TOKEN, tooling vars) do not
    # crash start-up with a pydantic extra_forbidden error.
    model_config = SettingsConfigDict(
        case_sensitive=True,
        env_file=".env",
        extra="ignore",
    )

    @property
    def cors_origins(self) -> List[str]:
        """Parsed allow-list of origins, with any trailing slash stripped."""
        raw = self.BACKEND_CORS_ORIGINS.strip()
        if not raw:
            return []

        if raw.startswith("["):
            try:
                items = json.loads(raw)
            except json.JSONDecodeError:
                items = []
        else:
            items = raw.split(",")

        return [str(item).strip().rstrip("/") for item in items if str(item).strip()]


settings = Settings()
