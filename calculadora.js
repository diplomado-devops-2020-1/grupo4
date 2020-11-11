$(document).ready(function() {
    setGrid()
});



function setGrid()
{
    var buttons = '';
    arrayButtons = ['9','8','7','+','6','5','4','-','3','2','1','x','0','.','=','/','C'];

    $.each(arrayButtons, function() {
        buttons += '<button class="calc-button" onclick="putResult(\''+this+'\')">'+this+'</button>';
      });
    $('#calcGrid').html(buttons);
}

function putResult(value)
{

    if (value != '=' && value != 'C')
    {
        $('#resultado').append(value);
    }
    else if (value == 'C')
    {
        $('#resultado').html('');
    }
    else
    {
        setResult($('#resultado').val());
    }

}

function setResult(value)
{
    if (occurrences(value, "+") >= 1) //Suma
    {
        $('#alert').html('La operación suma no se encuentra activa');
        $('#alert').show();
    }
    else if (occurrences(value, "-") >= 1) //Resta
    {
        $('#alert').html('La operación resta no se encuentra activa');
        $('#alert').show();
    }
    else if (occurrences(value, "x") >= 1) //Multiplicación
    {
        $('#alert').html('La operación multiplicación no se encuentra activa');
        $('#alert').show();
    }
    else if (occurrences(value, "/") >= 1) //Multiplicación
    {
        $('#alert').html('');
        $('#alert').hide();
        numbers = value.split('/')
        result = numbers[0];
        $.each(numbers, function(i, value) {
            if (parseFloat(value) == 0)
            {
                $('#alert').html('No es posible dividir por cero');
                result = 'NaN';
                $('#alert').show();
                return false;
            }
            if (i != 0)
            {
                result = result / parseFloat(value);
            }
        });
        $('#resultado').html(result.toFixed(4));
    }
}

function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}