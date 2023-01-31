import CheckboxData from './checkbox-data';

export default class MainConfig {
    public test1: CheckboxData = new CheckboxData("ATest");
    public test2: CheckboxData = new CheckboxData("BTest");
    public test3: CheckboxData = new CheckboxData("CTest", true);
    public test4: CheckboxData = new CheckboxData("DTest");
}
