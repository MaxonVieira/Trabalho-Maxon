$(function () {
  var operation = "C"; //"C"=Criar
  var selected_index = -1; // Indice do elemento selecionado na lista
  var tblPersons = localStorage.getItem("tblPersons"); //Retornar os dados cadastrados
  tblPersons = JSON.parse(tblPersons); //Converter a string em objeto
  if (tblPersons === null) // Se não tiver dados, adicionar um array vazio
      tblPersons = [];

  function Create() {
    //Obter os valores do html e trasforma-los em string
    var person = JSON.stringify({
      ID: $("#txtID").val(),
      Name: $("#txtName").val(),
      Phone: $("#txtPhone").val(),
      Email: $("#txtEmail").val()
    });
    //Adicionar um objeto a tabela
    tblPersons.push(person);
    //Armazenar os dados em Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    alert("O cadastro foi efetuado!"); //Mensagem de alerta
    return true;
  }

  function Edit() {
    // Editar um item selecionado na tabela
    tblPersons[selected_index] = JSON.stringify({
        ID: $("#txtID").val(),
        Name: $("#txtName").val(),
        Phone: $("#txtPhone").val(),
        Email: $("#txtEmail").val()
    });
    //Armazenar os dados em Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    alert("o cadastro foi editado!"); //Mensagem de alerta
    return true;
  }

  function Delete() {
    //Eliminar um elemento selecionado na tabela
    tblPersons.splice(selected_index, 1);
    //Atualizar os dados da Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    alert("Cadastro Deletado!"); //Mensagem de alerta
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +
            "<th>Nick</th>" +
            "<th>Nome</th>" +
            "<th>Telefone</th>" +
            "<th>Email</th>" +
            "<th>Ações</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
          ); //Adicionar à estrutura da tabela
    for (var i in tblPersons) {
        var per = JSON.parse(tblPersons[i]);
        $("#tblList tbody").append("<tr>" +
                "<td>" + per.ID + "</td>" +
                "<td>" + per.Name + "</td>" +
                "<td>" + per.Phone + "</td>" +
                "<td>" + per.Email + "</td>" +
                "<td><img src='https://upload.wikimedia.org/wikipedia/commons/9/9b/Farm-Fresh_application_edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='http://findicons.com/files/icons/2015/24x24_free_application/24/erase.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
                );
    } //Procurar e adicionar os itens para a tabela HTML
  }

  $("#frmPerson").bind("submit", function () {
    if (operation === "C")
        return Create();
    else
        return Edit();
  }); //Função que retorna a ação de adicionar ou editar

  List();

  $(".btnEdit").bind("click", function () {
    operation = "E"; //"E" = Editar
    //Obtendo o identificador do item a ser editado
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    // Convertendo o JSON para forma de dados adequado para editar
    var per = JSON.parse(tblPersons[selected_index]);
    $("#txtID").val(per.ID);
    $("#txtName").val(per.Name);
    $("#txtPhone").val(per.Phone);
    $("#txtEmail").val(per.Email);
    $("#txtID").attr("readonly", "readonly");
    $("#txtName").focus();
  });

  $(".btnDelete").bind("click", function () {
    //Obtendo o identificador do item a ser deletado
    selected_index = parseInt($(this).attr("alt").replace("Delete", ""));
    Delete(); //Eliminar o item
    List(); //Voltar para listar os itens
  });
});
