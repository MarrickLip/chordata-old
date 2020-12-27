class Project {
    toObject() {
        return {
            id: this.id,
        };
    }
    static fromObject() {
        return new Project;
    }
    static validate(target) {
        const project = (target instanceof Project) ? target.toObject() : target;
        return [true, undefined];
    }
}
