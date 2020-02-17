const express = require('express');
const dbObj = require('./database');
const libApp = express();
const port = 5454;
let bp = require('body-parser');
let cors = require('cors');

libApp.use(bp.urlencoded({ extended: true }));
libApp.use(bp.json());
libApp.use(cors());


//Get all active employee projections of specific project
libApp.get("/listAllProj", (_req, res) => {
    dbObj.listAllProjects().then((projectList) => {
        res.json(projectList);
    }).catch((err) => {
        errobj = { errcode: 500, error: err }
        res.json(errobj);
    });
});

//Get all active employee projections of specific project
libApp.get("/listEmpInProj", (req, res) => {
    var projId = req.body.projId;
    dbObj.listEmployeeInProj(projId).then((allEmpInProj) => {
        res.json(allEmpInProj);
    }).catch((err) => {
        errobj = { errcode: 500, error: err }
        res.json(errobj);
    });
});

//Get all active employee projections of specific project
libApp.get("/getEmpDtl", (req, res) => {
    var empEsaLink = req.body.empEsaLink;
    var ctsEmpId = req.body.ctsEmpId;
    var revenueYear = req.body.revenueYear;
    dbObj.getEmployeeProjection(empEsaLink, ctsEmpId, revenueYear).then((empDtl) => {
        res.json(empDtl);
    }).catch((err) => {
        errobj = { errcode: 500, error: err }
        res.json(errobj);
    });
});

//get leave days of all associates
libApp.get("/getAllEmpLeave", (_req, res) => {
    dbObj.getAllEmployeeLeaves().then((allEmpLeave) => {
        res.json(allEmpLeave);
    }).catch((err) => {
        errobj = { errcode: 500, error: err }
        res.json(errobj);
    });
});

//list projection for all associates across all projects
libApp.get("/listAllEmp", (_req, res) => {
    dbObj.listAllEmployees().then((allEmp) => {
        res.json(allEmp);
    }).catch((err) => {
        errobj = { errcode: 500, error: err }
        res.json(errobj);
    });
});

//list all active projections across all projects
libApp.get("/listAllActEmp", (_req, res) => {
    dbObj.listAllActiveEmployee().then((allActEmp) => {
        res.json(allActEmp);
    }).catch((err) => {
        errobj = { errcode: 500, error: err }
        res.json(errobj);
    });
});

//list all inactive projections across all projects
libApp.get("/listAllInactEmp", (_req, res) => {
    dbObj.listAllInactiveEmployee().then((allInactEmp) => {
        res.json(allInactEmp);
    }).catch((err) => {
        errobj = { errcode: 500, error: err }
        res.json(errobj);
    });
});

//list all active projection for associates in a specific project
libApp.get("/listActEmpInProj", (req, res) => {
    var projId = req.body.projId;
    dbObj.listActiveEmployeeInProj(projId).then((actEmpInProj) => {
        res.json(actEmpInProj);
    }).catch((err) => {
        errobj = { errcode: 500, error: err }
        res.json(errobj);
    });
});

//list all inactive projection associates in a specific project
libApp.get("/listInactEmpInProj", (req, res) => {
    var projId = req.body.projId;
    dbObj.listInactiveEmployeeInProj(projId).then((inactInProj) => {
        res.json(inactInProj);
    }).catch((err) => {
        errobj = { errcode: 500, error: err }
        res.json(errobj);
    });
});


try {
    //initializing DB and start listening to port
    dbObj.initDb(() => {
        libApp.listen(port, function (err) {
            if (err) {
                throw err;
            }
            console.log("Server is up and running on port " + port);
        });
    });
} catch (error) {
    console.log("Error in starting server: ");
    console.log(error);
}