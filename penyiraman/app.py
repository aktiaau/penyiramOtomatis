from flask import Flask, flash, session, render_template, redirect, url_for, request

app=Flask(__name__) #membuat class atau object

@app.route('/')
def index():
    return render_template('index.html')

if __name__=='__main__':#menjalankan program
    app.run(debug=True)