var timeEl = $('#currentTime');
var projectSubmissionForm = $('#projectSubmissionForm');
var projectNameInput = $('#projectNameInput');
var projectTypeSelect = $('#projectTypeSelect');
var hourlyRateInput = $('#hourlyRateInput');
var dueDateInput = $('#dueDateInput');
var projectTableBody = $('#projectTableBody');
var projectModal = $('#projectModal');


function addProject(project) {
    var tr = $('<tr>');
    var nameTd = $('<td>');
    var typeTd = $('<td>');
    var rateTd = $('<td>');
    var dueDateTd = $('<td>');
    var tillDueTd = $('<td>');
    var revenueTd = $('<td>');
    var deleteTd = $('<td>');
    var deleteBtn = $('<button class="btn btn-danger">Delete</button>');

    var currentDate = moment().format('YYYY MM D');
    var dueDate = moment(project.dueDate);
    var tillDue = dueDate.diff(currentDate, 'days');
    var revenue = tillDue * 8 * project.rate;

    tr.append(nameTd.text(project.name));
    tr.append(typeTd.text(project.type));
    tr.append(rateTd.text(project.rate));
    tr.append(dueDateTd.text(project.dueDate));
    tr.append(tillDueTd.text(tillDue));
    tr.append(revenueTd.text(revenue));
    tr.append(deleteTd.append(deleteBtn));

    projectTableBody.append(tr);
    projectModal.modal('toggle');
};

function handleFormSubmit(event) {
    event.preventDefault();
    var newProject = {
        name: projectNameInput.val(),
        type: projectTypeSelect.val(),
        rate: hourlyRateInput.val(),
        dueDate: dueDateInput.val()
    }

    addProject(newProject);

};

function deleteRow() {
    $(this).parent().parent().remove();
};

function init() {
    var timeInterval = setInterval(function() {
        var currentTime = moment().format("MMM DD, YYYY [at] hh:mm:ss a");
        timeEl.text(currentTime);
    }, 1000)
};

projectSubmissionForm.on('submit', handleFormSubmit);
projectTableBody.on('click', 'button', deleteRow)

init();