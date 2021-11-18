const mysql = require('mysql');

//  Connection Pool
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
    connection.query('SELECT * FROM judges', (err, data) => {
        // When done with the connection, release it
        connection.release();
        if(!err) {
            res.render('judges', { rows: data, alert: ''});
        } else {
            console.log(err);
        }
        console.log('This data from judges table: \n', data);
    });    
});
}

// Find Clients by search
exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;
        let filter = 'SELECT * FROM judges WHERE first_name LIKE ? OR last_name LIKE ? OR phone_number LIKE ? OR email_address LIKE ? OR courtID LIKE?  OR clerk LIKE? OR judgeID LIKE? OR courtroom_num LIKE?'
    // Court connection 
    connection.query(filter, ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, data) => {
        // When done with the connection, release it
        connection.release();
        if(!err) {
            res.render('judges', { rows: data });
        } else {
            console.log(err);
        }
        console.log('This data from judges table: \n', data);
    });    
});
}

//  Exports the form to database
exports.form = (req, res) => {
    res.render('add-judge')
}

// Add new judge
exports.create = (req, res) => {
    const { first_name, last_name, courtID, clerk, courtroom_num, phone_number, email_address } = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        let add = 'INSERT INTO judges SET first_name = ?, last_name = ?, courtID = ?, clerk = ?, courtroom_num =?, phone_number = ?, email_address = ?'
    // judge connection 
    connection.query(add,[first_name, last_name, courtID, clerk, courtroom_num, phone_number, email_address], (err, data) => {
        // When done with the connection, release it
        connection.release();
        if(!err) {
            res.render('add-judge');
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
        connection.query('SELECT * FROM judges WHERE judgeID =?',[req.params.id], (err, data) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.render('edit-judge', { rows: data });
            } else {
                console.log(err);
            }
            console.log('This data from judge table: \n', data);
        });    
    });
};

//Update client
exports.update = (req, res) =>{
    const { first_name, last_name, courtID, clerk, courtroom_num, phone_number, email_address  } = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);
        // Court connection 
        let judgeUpdate = 'UPDATE judges SET first_name = ?, last_name = ?, courtID = ?, clerk = ?,courtroom_num =?, phone_number = ?, email_address = ? WHERE judgeID = ?'
        connection.query(judgeUpdate,[first_name, last_name, courtID, clerk, courtroom_num, phone_number, email_address, req.params.id], (err, data) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                
                pool.getConnection((err, connection) => {
                    if(err) throw err; // not connected
                    console.log('Connected as ID ' + connection.threadId);
            
                    // judge connection 
                    connection.query('SELECT * FROM judges WHERE judgeID =?',[req.params.id], (err, data) => {
                        // When done with the connection, release it
                        connection.release();
                        if(!err) {
                            res.render('edit-judge', { rows: data });
                        } else {
                            console.log(err);
                        }
                        console.log('This data from judge table: \n', data);
                    });    
                });
            } else {
                console.log(err);
            }
            console.log('This data from judges table: \n', data);
        });    
    });
};

// Delete Client
exports.delete = (req, res) =>{

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        // Court connection 
        connection.query('DELETE FROM judges WHERE judgeID = ?',[req.params.id], (err, data) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.redirect('/judges');
            } else {
                console.log(err);
            }
            console.log('This data from judges table: \n', data);
        });    
    });
};
