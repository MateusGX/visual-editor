
var elements = [];
var elements_IDs = 0;

var conns = 0;

var conn = false;

var connElem = 0;

var codigo = [];

function node(elem){
    elem.style.left = "20px";
    elem.style.top = "60px";
    var x = 0;
    var y = 0;

    var auxX = 0;
    var auxY = 0;

    elem.getElementsByClassName("title")[0].onmousedown = mouseDown;

    function mouseDown(event) {
        elem.getElementsByClassName("title")[0].style.cursor = "grabbing";
        
        auxX = event.clientX;
        auxY = event.clientY;
        document.onmousemove = mouseMove;
        document.onmouseup = mouseUp;
    }

    function mouseMove(event) {
        gerarLinhas();
        x = auxX - event.clientX;
        y = auxY - event.clientY;

        auxX = event.clientX;
        auxY = event.clientY;

        if((elem.offsetLeft - x) > 20){
            elem.style.left = `${elem.offsetLeft - x}px`;
        }
        if((elem.offsetTop - y) > 60){
            elem.style.top = `${elem.offsetTop - y}px`;
        }
    }

    function mouseUp(event) {
        elem.getElementsByClassName("title")[0].style.cursor = "grab";
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function conectar(id) {
    if(conn){
        elements[id]['btnIn'].innerHTML = `E_${conns}`;
        elements[id]['btnIn'].setAttribute('disabled', 'true');
        if(elements[connElem]['tipo'] != "v"){
            elements[connElem]['btnOut'].innerHTML = `S_${conns}`;
        }
        //elements[connElem]['btnIn'].removeAttribute('disabled', 'false');
        conns++;
        conn = false;
        codigo.push({
            "elemIn": id,
            "elemOut": connElem
        });
        gerarLinhas();
    }else{
        //elements[id]['btnIn'].setAttribute('disabled', 'true');
        if(elements[id]['tipo'] != "v"){
            elements[id]['btnOut'].setAttribute('disabled', 'true');
        }
        connElem = id;
        conn = true;
    }
}

function criar() {

    let nodeEle = document.createElement('div');
    nodeEle.setAttribute('class', 'node');
    nodeEle.setAttribute('id', `node_${elements_IDs}`);

    let title = document.createElement('div');
    title.setAttribute('class', 'title');
    let txt = document.getElementById('elemItem').value;

    let btnIn = document.createElement('button');
    btnIn.setAttribute('class', 'btn input');
    btnIn.setAttribute('onclick', `conectar(${elements_IDs})`);
    btnIn.innerHTML = "E";

    let btnOut = document.createElement('button');
    btnOut.setAttribute('class', 'btn output');
    btnOut.setAttribute('onclick', `conectar(${elements_IDs})`);
    btnOut.innerHTML = "S";

    let content = document.createElement('div');
    content.setAttribute('class', 'content');

    let controls = document.createElement('div');

    if(document.getElementById('elemItem').value == "e"){
        title.innerHTML = "ENTRADA";
        let input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("class", "ipt");
        controls.appendChild(input);
        controls.style.marginLeft = "10px";
        content.appendChild(controls);
        content.appendChild(btnOut);
        nodeEle.appendChild(title);
        nodeEle.appendChild(content);
    } else if(document.getElementById('elemItem').value == "s"){
        title.innerHTML = "SAÍDA";
        controls.innerHTML = "0";
        content.appendChild(btnIn);
        content.appendChild(controls);
        content.appendChild(btnOut);
        nodeEle.appendChild(title);
        nodeEle.appendChild(content);
    } else if(document.getElementById('elemItem').value == "v"){
        title.innerHTML = "VARIÁVEL";
        let tipo = document.createElement("select");
        tipo.setAttribute("class", "tipo");

        let tipo_num = document.createElement("option");
        tipo_num.setAttribute("value", "num");
        tipo_num.innerHTML = "NÚMERO";
        tipo.appendChild(tipo_num);

        let tipo_txt = document.createElement("option");
        tipo_txt.setAttribute("value", "txt");
        tipo_txt.innerHTML = "TEXTO";
        tipo.appendChild(tipo_txt);

        let tipo_lo = document.createElement("option");
        tipo_lo.setAttribute("value", "lo");
        tipo_lo.innerHTML = "LÓGICO";
        tipo.appendChild(tipo_lo);

        controls.appendChild(tipo);
        content.appendChild(btnIn);
        content.appendChild(controls);
        content.appendChild(btnOut);
        nodeEle.appendChild(title);
        nodeEle.appendChild(content);
    } else if(document.getElementById('elemItem').value == "se"){
        title.innerHTML = "SE";

        btnIn = document.createElement('div');
        btnIn.style.marginTop = "5px";
        btnIn.style.marginBottom = "5px";
        btnIn.style.display = "flex";
        btnIn.style.flexDirection = "column";

        let btnIn1 = document.createElement('button');
        btnIn1.setAttribute('class', 'btn input');
        btnIn1.setAttribute('onclick', `conectar(${elements_IDs})`);
        btnIn1.innerHTML = "E";
        btnIn1.style.marginBottom = "5px";
        btnIn.appendChild(btnIn1);

        let btnIn2 = document.createElement('button');
        btnIn2.setAttribute('class', 'btn input');
        btnIn2.setAttribute('onclick', `conectar(${elements_IDs})`);
        btnIn2.innerHTML = "E";
        btnIn.appendChild(btnIn2);

        btnOut = document.createElement('div');
        btnOut.style.marginTop = "5px";
        btnOut.style.marginBottom = "5px";
        btnOut.style.display = "flex";
        btnOut.style.flexDirection = "column";

        let btnOutS = document.createElement('button');
        btnOutS.setAttribute('class', 'btn output');
        btnOutS.setAttribute('onclick', `conectar(${elements_IDs})`);
        btnOutS.innerHTML = "SE";
        btnOutS.style.marginBottom = "5px";
        btnOut.appendChild(btnOutS);

        let btnOutSN = document.createElement('button');
        btnOutSN.setAttribute('class', 'btn output');
        btnOutSN.setAttribute('onclick', `conectar(${elements_IDs})`);
        btnOutSN.innerHTML = "SE NÃO";
        btnOut.appendChild(btnOutSN);

        let tipo = document.createElement("select");
        tipo.setAttribute("class", "tipo");

        let tipo_i = document.createElement("option");
        tipo_i.setAttribute("value", "i");
        tipo_i.innerHTML = "IGUAL";
        tipo.appendChild(tipo_i);

        let tipo_d = document.createElement("option");
        tipo_d.setAttribute("value", "d");
        tipo_d.innerHTML = "DIFERENTE";
        tipo.appendChild(tipo_d);

        let tipo_min_i = document.createElement("option");
        tipo_min_i.setAttribute("value", "min_i");
        tipo_min_i.innerHTML = "MENOR/IGUAL";
        tipo.appendChild(tipo_min_i);

        let tipo_max_i = document.createElement("option");
        tipo_max_i.setAttribute("value", "max_i");
        tipo_max_i.innerHTML = "MAIOR/IGUAL";
        tipo.appendChild(tipo_max_i);

        let tipo_min = document.createElement("option");
        tipo_min.setAttribute("value", "min");
        tipo_min.innerHTML = "MENOR";
        tipo.appendChild(tipo_min);

        let tipo_max = document.createElement("option");
        tipo_max.setAttribute("value", "max");
        tipo_max.innerHTML = "MAIOR";
        tipo.appendChild(tipo_max);

        controls.appendChild(tipo);


        content.appendChild(btnIn);
        content.appendChild(controls);
        content.appendChild(btnOut);
        nodeEle.appendChild(title);
        nodeEle.appendChild(content);
    } else if(document.getElementById('elemItem').value == "o"){
        title.innerHTML = "OPERAÇÃO";
        let tipo = document.createElement("select");
        tipo.setAttribute("class", "tipo");

        let tipo_s = document.createElement("option");
        tipo_s.setAttribute("value", "sc");
        tipo_s.innerHTML = "SOMA/CONCAT.";
        tipo.appendChild(tipo_s);

        let tipo_sub = document.createElement("option");
        tipo_sub.setAttribute("value", "sub");
        tipo_sub.innerHTML = "SUBTRAÇÃO";
        tipo.appendChild(tipo_sub);

        let tipo_mm = document.createElement("option");
        tipo_mm.setAttribute("value", "mm");
        tipo_mm.innerHTML = "MULTIPLICAÇÃO";
        tipo.appendChild(tipo_mm);

        let tipo_div = document.createElement("option");
        tipo_div.setAttribute("value", "div");
        tipo_div.innerHTML = "DIVISÃO";
        tipo.appendChild(tipo_div);

        controls.appendChild(tipo);
        content.appendChild(btnIn);
        content.appendChild(controls);
        content.appendChild(btnOut);
        nodeEle.appendChild(title);
        nodeEle.appendChild(content);
    } else {
        title.innerHTML = "ERROR";
        nodeEle.appendChild(title);
        nodeEle.appendChild(content);
    }

    document.body.appendChild(nodeEle);
    node(nodeEle);
    elements.push({
        "id": elements_IDs,
        "elemento": nodeEle,
        "btnIn": btnIn,
        "btnOut": btnOut,
        "tipo": document.getElementById('elemItem').value
    });
    elements_IDs++;
}

function gerarLinhas() {
    document.getElementById("connLines").innerHTML = "";
    if(codigo.length >= 1){
        for (let i = 0; i < codigo.length; i++) {
            let elem = document.createElementNS("http://www.w3.org/2000/svg", "line");
            elem.setAttributeNS(null, "x1", Number(elements[codigo[i]["elemOut"]]["elemento"].style.left.replace("px", "")) + (Number(elements[codigo[i]["elemOut"]]["elemento"].offsetWidth)/2));
            elem.setAttributeNS(null, "y1", Number(elements[codigo[i]["elemOut"]]["elemento"].style.top.replace("px", "")) + (Number(elements[codigo[i]["elemOut"]]["elemento"].offsetHeight)/2));
            elem.setAttributeNS(null, "x2", Number(elements[codigo[i]["elemIn"]]["elemento"].style.left.replace("px", "")) + (Number(elements[codigo[i]["elemIn"]]["elemento"].offsetWidth)/2));
            elem.setAttributeNS(null, "y2", Number(elements[codigo[i]["elemIn"]]["elemento"].style.top.replace("px", "")) + (Number(elements[codigo[i]["elemIn"]]["elemento"].offsetHeight)/2));
            elem.setAttributeNS(null, "fill", "none");
            elem.setAttributeNS(null, "stroke", "black");
            elem.setAttributeNS(null, "stroke-width", "3");
            document.getElementById("connLines").appendChild(elem);
        }
    }
}