import webbrowser
import os

# ==== Corpo do e-mail com rodapé em retângulo ====
html_content = f"""
<html>
<body style="font-family:Arial, sans-serif; color:#333;">

<h2>Teste de Visualização</h2>

<p>Este é um teste para visualizar como ficará o rodapé no e-mail.</p>

<hr style="border:none; border-top:2px solid #800080; margin:30px 0;">

<!-- Retângulo roxo com texto branco -->
<div style="
    background-color:#800080;
    color:white;
    text-align:center;
    padding:10px 0;
    border-radius:8px;
    font-weight:bold;
    font-size:14px;
    max-width:300px;
    margin: 0 auto;
">
    GovTI | Grendene
</div>

</body>
</html>
"""

# ==== Gerar arquivo HTML ====
file_path = os.path.abspath("email_rodape_teste.html")
with open(file_path, "w", encoding="utf-8") as file:
    file.write(html_content)

# ==== Abrir no navegador ====
webbrowser.open(f"file://{file_path}")
