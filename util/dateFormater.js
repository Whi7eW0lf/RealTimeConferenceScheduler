function formatDateTimeConferences(object) {
    return formatDateTime = object.map(e => {
        const startTime = e.startTime.toString().substring(0, 21);
        const endTime = e.endTime.toString().substring(0, 21);
        return {
            _id: e._id,
            name: e.name,
            description: e.description,
            startTime: startTime,
            endTime: endTime,
            address: e.address
        }

    });
}

module.exports = formatDateTimeConferences;