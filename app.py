from flask import Flask, render_template, request, redirect, url_for
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'      
app.config['MYSQL_PASSWORD'] = ''       
app.config['MYSQL_DB'] = 'entre_hojas'  

mysql = MySQL(app)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/carrito')
def carrito():
    return render_template('carrito.html')

@app.route('/registrate')
def registrate():
    return render_template('registrate.html')

@app.route('/cuenta')
def cuenta():
    return render_template('cuenta.html')

@app.route('/tiendas')
def tiendas():
    return render_template('tiendas.html')

@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')

@app.route('/envio')
def envio():  
    return render_template('envio.html')

@app.route('/privacidad')
def privacidad():  
    return render_template('privacidad.html')

@app.route('/devoluciones')
def devoluciones():  
    return render_template('devoluciones.html')

@app.route('/terminos')
def terminos():  
    return render_template('terminos.html')


@app.route('/guardar_usuario', methods=['POST'])
def guardar_usuario():
    if request.method == 'POST':
        nombre = request.form.get('nombre')
        apellido = request.form.get('apellido')
        dni = request.form.get('dni')
        celular = request.form.get('celular')
        correo = request.form.get('email') 
        password = request.form.get('password')

        try:
            cur = mysql.connection.cursor()
            
            cur.execute("""
                INSERT INTO usuarios (nombre, apellido, dni, celular, correo, contrasena)
                VALUES (%s, %s, %s, %s, %s, %s)
            """, (nombre, apellido, dni, celular, correo, password))
            
            mysql.connection.commit()
            
            cur.close()
            
            print(f"ÉXITO: Usuario {nombre} guardado correctamente en phpMyAdmin.")
            
        except Exception as e:
            print(f"ERROR al guardar: {e}")
        return redirect(url_for('index'))

@app.route('/login', methods=['POST'])
def login():
    if request.method == 'POST':
        correo = request.form.get('email')
        password = request.form.get('password')

        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM usuarios WHERE correo = %s AND contrasena = %s", (correo, password))
        usuario = cur.fetchone() 
        cur.close()

        if usuario:
            print(f"Bienvenido de nuevo, {usuario[1]}")
            return redirect(url_for('index'))
        else:
          
            print("Error: Correo o contraseña incorrectos")
            return "Datos incorrectos. <a href='/cuenta'>Volver a intentar</a>"


if __name__ == '__main__':
 
    app.run(debug=True)