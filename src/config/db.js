const oracledb = require("oracledb")

oracledb.autoCommit = true;

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
      return string;
    }catch(err){
      console.log(err)
      return err
    }finally{
      await conect.close()
    }
  }

exports.insert_procedure = async (object) =>{
    let conect;
    try{
        conect = await oracledb.getConnection({
          user:process.env.DB_USR,
          password: process.env.DB_PW,
          connectString: process.env.DBC
        })
    const insert = object.insert.map(val => isNaN(val)?`''${val}''`:val).join(',')
    return await conect.execute(`
        begin
            insert_global('${object.tabla}','${insert}');
        end;
    `).then(response => console.log('funciono'))
    .catch(err => console.log(err))
    }catch(err){
      console.log(err)
        return err
    }finally{
        conect.close()                
    }
}

exports.update_procedure = async (cosa) => {
    let conect;
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
    return await conect.execute(
      `begin
            update_general('${cosa.tabla}','${update}',${cosa.id});
        end;
      `)
    }
    catch(err){
      console.log(err)
        return err
    }finally{
        conect.close()
    }
}
exports.delete_procedure = async (objeto) =>{
  let conect;
    try{
      conect = await oracledb.getConnection({
        user:process.env.DB_USR,
        password: process.env.DB_PW,
        connectString: process.env.DBC
      })
    return await conect.execute(
      `begin
            delete_general('${objeto.tabla}','${objeto.id}');
        end;
      `)
    }
    catch(err){
      console.log(err)
      return err
    }finally{
      conect.close()
    }
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
    conect.close()
  }
}
exports.global_procedure = async (procedure,inserts,resopnse_json) =>{
  let conect = await oracledb.getConnection({
    user:process.env.DB_USR,
    password: process.env.DB_PW,
    connectString: process.env.DBC
  })
  if(Array.isArray(inserts)){
    inserts = inserts.map(val => {
      var value = isNaN(val.value)?`''${val.value}''`:val.value
      return val.columna+' = '+ value
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
          console.log(inserts)
          await conect.execute(
            `BEGIN
               DBMS_OUTPUT.ENABLE(NULL);
             END;`);
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
          return string;
        break;
      case 1:
        return await conect.execute(
          `begin
                ${procedure}('${inserts}');
            end;
          `)
        break;
      default:
        return 'no existe otro tipo de respuesta'
    }
      
  }catch(err){
    console.log(err)
    return err
  }finally{
    conect.close()
  }
}