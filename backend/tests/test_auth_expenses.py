from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_user_can_register_and_create_expense():
    register_response = client.post(
        "/api/auth/register",
        json={
            "name": "Test User",
            "email": "test-user@example.com",
            "password": "password123",
        },
    )

    assert register_response.status_code in {201, 400}

    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "test-user@example.com",
            "password": "password123",
        },
    )

    assert login_response.status_code == 200
    token = login_response.json()["access_token"]

    expense_response = client.post(
        "/api/expenses",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "amount": 1200,
            "category": "Food",
            "description": "Lunch meeting",
            "date": "2026-05-24",
        },
    )

    assert expense_response.status_code == 201
    assert expense_response.json()["category"] == "Food"
