import { RequiredCPFError, RequiredEmailError, RequiredFieldError } from '@/app/errors';
import { Validator } from '@/app/validation';

export class Required implements Validator {
    constructor(
        readonly value: unknown,
        readonly fieldName?: string
    ) { }

    validate(): Error | undefined {
        if (this.value === null || this.value === undefined) {
            return new RequiredFieldError(this.fieldName);
        }
        return undefined;
    }
}
export class RequiredString extends Required {
    constructor(
        readonly value: string,
        readonly fieldName?: string
    ) { super(value, fieldName); }

    validate(): Error | undefined {
        if (super.validate() !== undefined || this.value === '') {
            return new RequiredFieldError(this.fieldName);
        }
        return undefined;
    }
}

export class RequiredNumber extends Required {
    constructor(readonly value: number, readonly fieldName?: string) {
        super(value, fieldName);
    }

    validate(): Error | undefined {
        const strNumber = this.value.toString();
        if (super.validate() !== undefined || Number.isNaN(parseInt(strNumber))) {
            return new RequiredFieldError(this.fieldName);
        }
        return undefined;
    }
}

export class RequiredEmail extends RequiredString {
    /* eslint-disable */
    private readonly EMAIL_REGEX =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    constructor(
        readonly value: string,
        readonly fieldName?: string
    ) {
        super(value, fieldName);
    }
    validate(): Error | undefined {
        if (super.validate() !== undefined || !this.EMAIL_REGEX.test(this.value)) {
            return new RequiredEmailError();
        }
        return undefined;
    }
}

export class RequiredCPF extends RequiredString {
    /* eslint-disable */
    private readonly CPF_REGEX =
        /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    constructor(
        readonly value: string,
        readonly fieldName?: string
    ) {
        super(value, fieldName);
    }
    validate(): Error | undefined {
        if (super.validate() !== undefined || !this.CPF_REGEX.test(this.value)) {
            return new RequiredCPFError();
        }
        return undefined;
    }
}