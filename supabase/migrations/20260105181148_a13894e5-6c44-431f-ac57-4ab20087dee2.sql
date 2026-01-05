-- Resetar a sequência de identidade para o próximo valor correto
SELECT setval(pg_get_serial_sequence('posts', 'id'), (SELECT COALESCE(MAX(id), 0) FROM posts) + 1, false);