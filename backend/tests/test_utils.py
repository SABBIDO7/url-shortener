from utils import generate_short_code

def test_generate_short_code_unique(db_session):
    codes = set()
    for _ in range(10):  # Generate multiple codes
        code = generate_short_code(db_session)
        assert code not in codes
        codes.add(code)

def test_generate_short_code_length(db_session):
    code = generate_short_code(db_session)
    assert len(code) == 6  # Check the default length

def test_generate_short_code_characters(db_session):
    code = generate_short_code(db_session)
    # Assert characters are within the allowed range
    assert all(c.isalnum() for c in code)