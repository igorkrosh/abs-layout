let timer;

$(document).ready(function() {
    SetAbsMediaFilter()
})

function SetAbsMediaFilter()
{
    $('#filter-month').change(function() {
        GoToMonth($(this).val())
    });

    $('#filter-news-type').change(function() {
        let val = $(this).val();

        if (val === 'all')
        {
            $('.abs-news-item.hidden').removeClass('hidden');
            return;
        }

        let targetHide = `.abs-news-item:not([filter-news-type="${val}"])`;
        let targetShow = `.abs-news-item[filter-news-type="${val}"]`
        
        $(targetHide).addClass('hidden');
        $(targetShow).removeClass('hidden');
    })
}

function GoToMonth(month)
{
    $('.abs-card.active').animate({
        opacity: 0
    }, 500, function(val) {
        $('.abs-card.active').removeClass('active');

        let target = `.abs-card[filter-month="${month}"]`

        if ($(target + ' .abs-news-item').length === 0)
        {
            CreateTimer(target, month);
        }
        else
        {
            DeleteTimer();
        }

        $(target).css('opacity', 0);
        $(target).addClass('active');
        $(target).animate({
            opacity: 1
        }, 500)
    });
}

function CreateTimer(target, monthIndex)
{
    DeleteTimer();
    
    let timerHTML = `
    <div class="timer-wrapper">
        <span class="timer-title">До появления информации в разделе</span>
        <div class="timer">
            <div class="days timer-item">
                <span class="value">00</span>
                <span class="value-title">дней</span>
            </div>
            <div class="hours timer-item">
                <span class="value">00</span>
                <span class="value-title">часов</span>
            </div>
            <div class="minutes timer-item">
                <span class="value">00</span>
                <span class="value-title">минут</span>
            </div>
            <div class="seconds timer-item">
                <span class="value">00</span>
                <span class="value-title">секунд</span>
            </div>
        </div>
    </div>
    `;

    $(target + ' .abs-news-wrapper').append(timerHTML);

    timer = setInterval(function () {
        UpdateTimer(target, monthIndex);
    }, 1000);
    
}

function UpdateTimer(target, monthIndex)
{
    let dateNow = new Date();
    let year = 2021;
    let targetDate = new Date(year, monthIndex - 1, 1);
    let dateLeft = targetDate.getTime() - dateNow.getTime();


    let daysLeft = parseInt(dateLeft / 1000 / 60 / 60 / 24).toString().padStart(2,0);
    let hoursLeft = parseInt((dateLeft - daysLeft * 1000 * 60 * 60 * 24) / 1000 / 60 / 60).toString().padStart(2,0);
    let minutesLeft = parseInt((dateLeft - daysLeft * 1000 * 60 * 60 * 24 - hoursLeft * 1000 * 60 * 60) / 1000 / 60).toString().padStart(2,0);
    let secondsLeft = parseInt((dateLeft - daysLeft * 1000 * 60 * 60 * 24 - hoursLeft * 1000 * 60 * 60 - minutesLeft * 1000 * 60) / 1000).toString().padStart(2,0);

    $('.timer .days .value').text(daysLeft);
    $('.timer .hours .value').text(hoursLeft);
    $('.timer .minutes .value').text(minutesLeft);
    $('.timer .seconds .value').text(secondsLeft);
}

function DeleteTimer()
{
    $('.timer-wrapper').remove();
    clearInterval(timer);
}
