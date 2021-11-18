const mysql = require('mysql');

 // Connection Pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

// View cases
exports.view = (req,res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

    // Client connection 
    connection.query('SELECT * FROM cases', (err, data) => {
        // When done with the connection, release it
        connection.release();
        if(!err) {
            res.render('cases', { rows: data, alert: ''});
        } else {
            console.log(err);
        }
        console.log('This data from clients table: \n', data);
    });    
});
}

// Find Cases by search
exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;
        let filter = 'SELECT * FROM cases WHERE plaint_name LIKE ? OR defend_name LIKE ? OR civil LIKE ? OR criminal LIKE ? OR judge LIKE? or courtID LIKE? or clientID LIKE? OR civil_action_number LIKE ?'
    // Cases connection 
    connection.query(filter, ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, data) => {
        // When done with the connection, release it
        connection.release();
        if(!err) {
            res.render('cases', { rows: data });
        } else {
            console.log(err);
        }
        console.log('This data from cases table: \n', data);
    });    
});
}

//  Exports the form to database
exports.form = (req, res) => {
    res.render('add-case')
}

// Add new Case
exports.create = (req, res) => {
    const { civil_action_number, plaint_name, defend_name,clientID, courtID, judge, civil, criminal } = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        let add = 'INSERT INTO cases SET civil_action_number = ?, plaint_name = ?, defend_name = ?, clientID = ?, courtID = ?, judge =?, civil = ?, criminal = ?'
    // Cases connection 
    connection.query(add,[civil_action_number, plaint_name, defend_name,clientID, courtID, judge, civil, criminal], (err, data) => {
        // When done with the connection, release it
        connection.release();
        if(!err) {
            res.render('add-case');
        } else {
            console.log(err);
        }
        console.log('This data from cases table: \n', data);
    });    
});

}

//Edit case
exports.edit = (req, res) =>{

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        // Case connection 
        connection.query('SELECT * FROM cases WHERE civil_action_number =?',[req.params.id], (err, data) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.render('edit-case', { rows: data });
            } else {
                console.log(err);
            }
            console.log('This data from client table: \n', data);
        });    
    });
};

//Update cases
exports.update = (req, res) =>{
    const {  civil_action_number, plaint_name, defend_name,clientID, courtID, judge, civil, criminal  } = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);
        // Cases connection 
        let clientUpdate = 'UPDATE cases SET civil_action_number = ?, plaint_name = ?, defend_name = ?, clientID = ?, courtID = ?, judge =?, civil = ?, criminal = ? WHERE civil_action_number = ?'
        connection.query(clientUpdate,[civil_action_number, plaint_name, defend_name,clientID, courtID, judge, civil, criminal, req.params.id], (err, data) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                
                pool.getConnection((err, connection) => {
                    if(err) throw err; // not connected
                    console.log('Connected as ID ' + connection.threadId);
            
                    // Cases connection 
                    connection.query('SELECT * FROM cases WHERE civil_action_number =?',[req.params.id], (err, data) => {
                        // When done with the connection, release it
                        connection.release();
                        if(!err) {
                            res.render('edit-case', { rows: data });
                        } else {
                            console.log(err);
                        }
                        console.log('This data from cases table: \n', data);
                    });    
                });
            } else {
                console.log(err);
            }
            console.log('This data from clients table: \n', data);
        });    
    });
};

//Delete Cases
// Delete Client
exports.delete = (req, res) =>{

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        // Court connection 
        connection.query('DELETE FROM cases WHERE civil_action_number = ?',[req.params.id], (err, data) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.redirect('/cases');
            } else {
                console.log(err);
            }
            console.log('This data from cases table: \n', data);
        });    
    });
};
