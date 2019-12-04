async function ok(value, message, reply) {
    return reply
        .status(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            response: {
                status: true,
                message: message,
                data: value
            }
        });
}

async function badRequest(reply) {
    return reply
        .status(400)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            response: {
                status: false,
                message: 'param is missing or the value is empty'
            }
        });
}

async function mandatoryField(message, reply) {
    return reply
        .status(422)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            response: {
                status: false,
                message: message
            }
        });
}

async function conflict(message, reply) {
    return reply
        .status(409)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            response: {
                status: false,
                message: message
            }
        });
}

async function fatalError(reply) {
    return reply
        .status(500)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            response: {
                status: false,
                message: "Internal Server Error. Please Contact Your Administrator."
            }
        });
}

async function urlNotFound(reply) {
    return reply
        .status(401)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            response: {
                status: false,
                message: "Request URL Not found."
            }
        });
}

async function validate(message, reply) {
    return reply
        .status(422)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({
            response: {
                status: false,
                message: message
            }
        });
}

module.exports = { ok, badRequest, mandatoryField, conflict, fatalError, urlNotFound, validate };