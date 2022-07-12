class FeedbackValidator {

    // Title errors
    validateTitle(title) {
        let error = "";
        if (!title || title === '') {
            error = 'title cannot be empty!';
        } else if (title.length < 5) {
            error = 'title is too short!';
        } else if (title.length > 50) {
            error = 'title is too long!';
        }
        return error
    }

    // Content errors
    validateContent(content) {
        let error = "";
        if (!content || content === '') {
            error = 'content cannot be empty!';
        } else if (content.length < 20) {
            error = 'content is too short!';
        } else if (content.length > 1024) {
            error = 'content is too long!';
        }
        return error
    }

    // Type errors
    validateType(type) {
        let error = "";
        if (!type || type === '') {
            error = 'type cannot be empty!';
        }
        return error
    }

    validateAll(data) {
        let titleError = this.validateTitle(data.title)
        let contentError = this.validateContent(data.content)
        let typeError = this.validateType(data.type)

        return {
            titleError,
            contentError,
            typeError,
        }
    }

}

export default new FeedbackValidator()