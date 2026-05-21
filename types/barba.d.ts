declare module "@barba/core" {
  export interface ITransitionData {
    current: { container: HTMLElement };
    next: { container: HTMLElement };
  }

  export interface ITransition {
    name: string;
    leave?: (data: ITransitionData) => void | Promise<void>;
    enter?: (data: ITransitionData) => void | Promise<void>;
  }

  export interface IBarbaOptions {
    prevent?: (data: { el?: HTMLElement; event?: Event }) => boolean;
    transitions?: ITransition[];
  }

  interface Barba {
    init(options: IBarbaOptions): void;
    destroy(): void;
  }

  const barba: Barba;
  export default barba;
}
