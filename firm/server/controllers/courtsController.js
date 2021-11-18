const mysql = require('mysql');



//  Connection Pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});



// View Courts
exports.view = (req,res) => {


    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

    // Court connection 
    connection.query('SELECT * FROM courts', (err, data) => {
        // When done with the connection, release it
        connection.release();
        if(!err) {
            res.render('courts', { rows: data, alert: ''});
        } else {
            console.log(err);
        }
        console.log('This data from courts table: \n', data);
    });    
});
}

// Find Court by search
exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;
        let filter = 'SELECT * FROM courts WHERE court_name LIKE ? OR city LIKE? or state LIKE? or courtID LIKE? OR address LIKE?'
    // Court connection 
    connection.query(filter, ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%'], (err, data) => {
        // When done with the connection, release it
        connection.release();
        if(!err) {
            res.render('courts', { rows: data });
        } else {
            console.log(err);
        }
        console.log('This data from courts table: \n', data);
    });    
});
}

//  Exports the form to database
exports.form = (req, res) => {
    res.render('add-court')
}

// Add new Court
exports.create = (req, res) => {
    const { court_name, address, city, state, zip_code } = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        let add = 'INSERT INTO courts SET court_name = ?, address = ?, city =?, state = ?, zip_code = ?'
    // Court connection 
    connection.query(add,[court_name, address, city, state, zip_code], (err, data) => {
        // When done with the connection, release it
        connection.release();
        if(!err) {
            res.render('add-court', { alert: 'court added successfully' });
        } else {
            console.log(err);
        }
        console.log('This data from courts table: \n', data);
    });    
});

}


//Edit user
exports.edit = (req, res) =>{

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        // Court connection 
        connection.query('SELECT * FROM courts WHERE courtID =?',[req.params.id], (err, data) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.render('edit-court', { rows: data });
            } else {
                console.log(err);
            }
            console.log('This data from courts table: \n', data);
        });    
    });
};

//Update user
exports.update = (req, res) =>{
    const { court_name, address, city, state, zip_code } = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);
        // Court connection 
        connection.query('UPDATE courts SET court_name = ?, address = ?, city = ?, state = ?, zip_code = ?  WHERE courtID = ?',[court_name, address, city, state, zip_code, req.params.id], (err, data) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                
                pool.getConnection((err, connection) => {
                    if(err) throw err; // not connected
                    console.log('Connected as ID ' + connection.threadId);
            
                    // Court connection 
                    connection.query('SELECT * FROM courts WHERE courtID =?',[req.params.id], (err, data) => {
                        // When done with the connection, release it
                        connection.release();
                        if(!err) {
                            res.render('edit-court', { rows: data });
                        } else {
                            console.log(err);
                        }
                        console.log('This data from courts table: \n', data);
                    });    
                });
            } else {
                console.log(err);
            }
            console.log('This data from courts table: \n', data);
        });    
    });
};


// Delete Court
exports.delete = (req, res) =>{

    pool.getConnection((err, connection) => {
        if(err) throw err; // not connected
        console.log('Connected as ID ' + connection.threadId);

        // Court connection 
        connection.query('DELETE FROM courts WHERE courtID = ?',[req.params.id], (err, data) => {
            // When done with the connection, release it
            connection.release();
            if(!err) {
                res.redirect('/courts');
            } else {
                console.log(err);
            }
            console.log('This data from courts table: \n', data);
        });    
    });
};

