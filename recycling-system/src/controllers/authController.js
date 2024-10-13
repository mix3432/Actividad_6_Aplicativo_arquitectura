let users = [];

exports.register = (req, res) => {
    const { email, password } = req.body;

    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'El usuario ya está registrado.' });
    }

    users.push({ email, password });
    res.status(201).json({ message: 'Registro exitoso.' });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(400).json({ message: 'Credenciales incorrectas.' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso.' });
};
