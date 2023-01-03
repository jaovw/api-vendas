import handlebars from 'handlebars';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseEmailTemplate {
  template: string;
  variables: ITemplateVariable;
}

export default class HandlebarsMailTamplete {
  public async parse({
    template,
    variables,
  }: IParseEmailTemplate): Promise<string> {
    const parseTempalte = handlebars.compile(template);

    return parseTempalte(variables);
  }
}
