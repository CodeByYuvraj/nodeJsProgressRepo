exports.homeRoute = (req, res, next) => {
    res.json({hello : 'hii'});
}

exports.upcomingEventsRoute = (req, res, next) => {
    res.json({date: '17,July', event:'title', src: 'event.pdf'});
}