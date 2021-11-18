const mysql = require('mysql');

 //Connection Pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

// View clients
exports.view = (req,res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

    // Client connection 
    connection.query('SELECT * FROM clients', (err, data) => {
        // When done with the connection, release it
        connection.release();
        if(!err) {
            res.render('clients', { rows: data, alert: ''});
        } else {
            console.log(err);
        }
        console.log('This data from clients table: \n', data);
    });    
});
}

// Find Clients by search
exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;
        let filter = 'SELECT * FROM clients WHERE client_name LIKE ? OR contact_name LIKE ? OR phone_number LIKE ? OR email_address LIKE ? OR city LIKE? or state LIKE? or clientID LIKE? OR address LIKE? OR zip_code LIKE ?'
    // Court connection 
    connection.query(filter, ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, data) => {
        // When done with the connection, release it
        connection.release();
        if(!err) {
            res.render('clients', { rows: data });
        } else {
            console.log(err);
        }
        console.log('This data from clients table: \n', data);
    });    
});
}

//  Exports the form to database
exports.form = (req, res) => {
    res.render('add-client')
}

// Add new Client
exports.create = (req, res) => {
    const { client_name, contact_name, phone_number, email_address, address, city, state, zip_code } = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        let add = 'INSERT INTO clients SET client_name = ?, contact_name = ?, phone_number = ?, email_address = ?, address = ?, city =?, state = ?, zip_code = ?'
    // Court connection 
    connection.query(add,[client_name, contact_name, phone_number, email_address, address, city, state, zip_code], (err, data) => {
        // When done with the connection, release it
        connection.release();
        if(!err) {
            res.render('add-client');
        } else {
            console.log(err);
        }
        console.log('This data from clients table: \n', data);
    });    
});

}

//Edit client
exports.edit = (req, res) =>{

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        // Court connection 
        connection.query('SELECT * FROM clients WHERE clientID =?',[req.params.id], (err, data) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.render('edit-client', { rows: data });
            } else {
                console.log(err);
            }
            console.log('This data from client table: \n', data);
        });    
    });
};

//Update client
exports.update = (req, res) =>{
    const { client_name, contact_name, phone_number, email_address, address, city, state, zip_code } = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);
        // Court connection 
        let clientUpdate = 'UPDATE clients SET client_name = ?, contact_name = ?, phone_number = ?, email_address = ?, address = ?, city =?, state = ?, zip_code = ? WHERE clientID = ?'
        connection.query(clientUpdate,[client_name, contact_name, phone_number, email_address, address, city, state, zip_code, req.params.id], (err, data) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                
                pool.getConnection((err, connection) => {
                    if(err) throw err; // not connected
                    console.log('Connected as ID ' + connection.threadId);
            
                    // Court connection 
                    connection.query('SELECT * FROM clients WHERE clientID =?',[req.params.id], (err, data) => {
                        // When done with the connection, release it
                        connection.release();
                        if(!err) {
                            res.render('edit-client', { rows: data });
                        } else {
                            console.log(err);
                        }
                        console.log('This data from clients table: \n', data);
                    });    
                });
            } else {
                console.log(err);
            }
            console.log('This data from clients table: \n', data);
        });    
    });
};

// Delete Client
exports.delete = (req, res) =>{

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        // Court connection 
        connection.query('DELETE FROM clients WHERE clientID = ?',[req.params.id], (err, data) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.redirect('/clients');
            } else {
                console.log(err);
            }
            console.log('This data from clients table: \n', data);
        });    
    });
};

