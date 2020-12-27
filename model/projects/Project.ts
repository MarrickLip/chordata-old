class Project {
    id: string
    info: {
        name: string
        description: string
    }
    samples: {
        fields: SampleField[]
    }

    toObject(): object {
        return {
            id: this.id,
        }
    }

    static fromObject() {
        return new Project()
    }

    static validate(target: object | Project): [boolean, string?] {
        const project = target instanceof Project ? target.toObject() : target
        return [true, undefined]
    }
}

type SampleField = {
    id: string
    name: string
    required: boolean
    items: StringSampleField | NumberSampleField | LabelSampleField
}

type StringSampleField = { type: 'string' }
type NumberSampleField = { type: 'number' }
type LabelSampleField = {
    type: 'label'
    properties: { allowMultiple: boolean; values: string[] }
}
