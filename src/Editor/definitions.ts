
export interface setterProps {
    output_setter: React.Dispatch<React.SetStateAction<string>>;
    characterLimit: number;
}

export type jsonFormat = {
    input: string;
    ai: {
        response_1: {
            revision: string;
            feedback: string;
        };
        response_2: {
            revision: string;
            feedback: string;
        };
        response_3: {
            revision: string;
            feedback: string;
        };
        feedback: string;
    };
};


export type singleResponse = {
    response: {
        revision: string;
        feedback: string;
    };
};