INSERT INTO "Category" ("name", "parent_category_id")
SELECT sub.name, parent.id
FROM (
  VALUES
    ('Mercado', 'Limpeza'), ('Mercado', 'Bebidas'), ('Mercado', 'Hortifruti'),
    ('Mercado', 'Padaria'), ('Mercado', 'Açougue'), ('Mercado', 'Outros'),

    ('Farmácia', 'Medicamentos'), ('Farmácia', 'Higiene'), ('Farmácia', 'Cosméticos'),
    ('Farmácia', 'Outros'),

    ('Beleza', 'Cabelo'), ('Beleza', 'Maquiagem'), ('Beleza', 'Skincare'),
    ('Beleza', 'Esmaltes'), ('Beleza', 'Outros'),

    ('Moda', 'Calçados'), ('Moda', 'Camisetas e Blusas'), ('Moda', 'Shorts'),
    ('Moda', 'Calças'), ('Moda', 'Vestidos'), ('Moda', 'Outros'),

    ('Eletrônicos', 'Celulares'), ('Eletrônicos', 'Notebooks'), ('Eletrônicos', 'Tablets'),
    ('Eletrônicos', 'TVs'), ('Eletrônicos', 'Outros'),

    ('Jogos', 'Console'), ('Jogos', 'Eletrônicos'), ('Jogos', 'Tabuleiro'), ('Jogos', 'Outros'),

    ('Brinquedos', 'Pelúcias'), ('Brinquedos', 'Legos'), ('Brinquedos', 'Bonecas'),
    ('Brinquedos', 'Carrinhos'), ('Brinquedos', 'Quebra-cabeças'), ('Brinquedos', 'Outros'),

    ('Casa', 'Decoração'), ('Casa', 'Móveis'), ('Casa', 'Cozinha'), ('Casa', 'Sala'),
    ('Casa', 'Banheiro'), ('Casa', 'Quarto'), ('Casa', 'Outros')
)
AS sub(parent_name, name)
JOIN "Category" AS parent
ON parent.name = sub.parent_name
AND parent."parent_category_id" IS NULL
WHERE NOT EXISTS (
SELECT 1
FROM "Category" AS existing
WHERE existing.name = sub.name
AND existing."parent_category_id" = parent.id
);