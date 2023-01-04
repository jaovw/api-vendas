import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseEmailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class HandlebarsMailTamplete {
  public async parse({
    file,
    variables,
  }: IParseEmailTemplate): Promise<string> {
    const templateFile = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTempalte = handlebars.compile(templateFile);

    return parseTempalte(variables);
  }
}
