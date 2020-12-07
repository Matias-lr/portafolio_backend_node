const oracledb = require("oracledb")

oracledb.autoCommit = true;

const cleanProcess = async() => {
  let conect;
  try{
    conect = await oracledb.getConnection({
      user:process.env.DB_USR,
      password: process.env.DB_PW,
      connectString: process.env.DBC
    })
    await conect.execute(
      `BEGIN
        test_proceso();
       END;`);
  }catch(e){
    console.log(e)
  }finally{
    conect.close()
  }
}

exports.select_procedure = async (nombre) =>{
    let conect;
    let string;
    try{
      conect = await oracledb.getConnection({
        user:process.env.DB_USR,
        password: process.env.DB_PW,
        connectString: process.env.DBC
      })
      await conect.execute(
        `BEGIN
           DBMS_OUTPUT.ENABLE(NULL);
         END;`);
      await conect.execute(`BEGIN
        ${nombre}_select();
      END;`)
      let check;
      do {
        check = await conect.execute(
          `BEGIN
             DBMS_OUTPUT.GET_LINE(:ln, :st);
           END;`,
          { ln: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 32767 },
            st: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } });
        if (check.outBinds.st === 0)
          string = string + check.outBinds.ln
      } while (check.outBinds.st === 0);
      string = JSON.parse(string.replace('undefined','').replace('null','').replace(',]',']'))
      console.log(string)
      return string;
    }catch(err){
      console.log(err)
      return err
    }finally{
      if (conect) {
        try {
          console.log('se cierra todo')
          await conect.close();
          //cleanProcess()
        } catch (err) {
          console.error(err);
        }
      } 
    }
  }

exports.insert_procedure = async (object) =>{
    let conect;
    let result;
    try{
        conect = await oracledb.getConnection({
          user:process.env.DB_USR,
          password: process.env.DB_PW,
          connectString: process.env.DBC
        })
    const insert = object.insert.map(val => isNaN(val)?`''${val}''`:val).join(',')
    console.log(insert,object.tabla)
    result = await conect.execute(`
        begin
            insert_global('${object.tabla}','${insert}');
        end;
    `).then(response => console.log('funciono'))
    .catch(err => console.log(err))
    }catch(err){
      console.log(err)
        return err
    }finally{
      if (conect) {
        try {
          console.log('se cierra todo')
          await conect.close();
          //cleanProcess()
        } catch (err) {
          console.error(err);
        }
      }              
    }
    return result
}

exports.update_procedure = async (cosa) => {
    let conect;
    let result;
    try{
        conect = await oracledb.getConnection({
          user:process.env.DB_USR,
          password: process.env.DB_PW,
          connectString: process.env.DBC
        })
    const update = cosa.update.map(val => {
      var value = isNaN(val.value)?`''${val.value}''`:val.value
      return val.columna+' = '+ value
    } ).join(',');
    result = await conect.execute(
      `begin
            update_general('${cosa.tabla}','${update}',${cosa.id});
        end;
      `)
    }
    catch(err){
      console.log(err)
        return err
    }finally{
      if (conect) {
        try {
          console.log('se cierra todo')
          await conect.close();
          //cleanProcess()
        } catch (err) {
          console.error(err);
        }
      }
    }
    return result;
}
exports.delete_procedure = async (objeto) =>{
  let conect;
  let result;
    try{
      conect = await oracledb.getConnection({
        user:process.env.DB_USR,
        password: process.env.DB_PW,
        connectString: process.env.DBC
      })
    result = await conect.execute(
      `begin
            delete_general('${objeto.tabla}','${objeto.id}');
        end;
      `)
    }
    catch(err){
      console.log(err)
      return err
    }finally{
      if (conect) {
        try {
          console.log('se cierra todo')
          await conect.close();
          //cleanProcess()
        } catch (err) {
          console.error(err);
        }
      } 
    }
    return result;
}

exports.disable_procedure = async (objeto) =>{
  let conect;
  let result;
    try{
      conect = await oracledb.getConnection({
        user:process.env.DB_USR,
        password: process.env.DB_PW,
        connectString: process.env.DBC
      })
    result = await conect.execute(
      `begin
        activo_general('${objeto.tabla}','${objeto.id}');
      end;
      `)
    }
    catch(err){
      console.log(err)
      return err
    }finally{
      if (conect) {
        try {
          console.log('se cierra todo')
          await conect.close();
          //cleanProcess()
        } catch (err) {
          console.error(err);
        }
      } 
    }
    return result;
}

exports.select_raw = async(query) => {
  try{
    conect = await oracledb.getConnection({
      user:process.env.DB_USR,
      password: process.env.DB_PW,
      connectString: process.env.DBC
    })
    return await conect.execute(query)
  }catch(err){
    console.log(err)
    return err
  }finally{
    if (conect) {
      try {
        console.log('se cierra todo')
        await conect.close();
        //cleanProcess()
      } catch (err) {
        console.error(err);
      }
    } 
  }
}
exports.global_procedure = async (procedure,inserts,resopnse_json) =>{
  let conect = await oracledb.getConnection({
    user:process.env.DB_USR,
    password: process.env.DB_PW,
    connectString: process.env.DBC
  })
  let result;
  if(Array.isArray(inserts)){
    inserts = inserts.map(val => {
      var value = isNaN(val)?`'${val}'`:val
      return value
    }).join(',');
    procedureString = `${procedure}(${inserts});`
  }else{
    procedureString = isNaN(inserts) ? `${procedure}('${inserts}');`:`${procedure}(${inserts});`
  }
  try{
    switch (resopnse_json){
      case 0:
        let string;
          conect = await oracledb.getConnection({
            user:process.env.DB_USR,
            password: process.env.DB_PW,
            connectString: process.env.DBC
          })
          await conect.execute(
            `BEGIN
               DBMS_OUTPUT.ENABLE(NULL);
             END;`);
          console.log(procedureString)
          await conect.execute(`BEGIN
            ${procedureString}
          END;`)
          let check;
          do {
            check = await conect.execute(
              `BEGIN
                 DBMS_OUTPUT.GET_LINE(:ln, :st);
               END;`,
              { ln: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 32767 },
                st: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } });
            if (check.outBinds.st === 0)
              string = string + check.outBinds.ln
          } while (check.outBinds.st === 0);
          string = JSON.parse(string.replace('undefined','').replace('null','').replace(',]',']'))
          result = string;
        break;
      case 1:
        result = await conect.execute(
          `begin
                ${procedure}('${inserts}');
            end;
          `)
        break;
      default:
        result = 'no existe otro tipo de respuesta'
    }
  }catch(err){
    console.log(err)
    return err
  }finally{
    if (conect) {
      try {
        console.log('se cierra todo')
        await conect.close();
        //cleanProcess()
      } catch (err) {
        console.error(err);
      }
    }
  }
  return result;
}