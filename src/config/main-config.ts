import CheckboxData from './checkbox-data';

export default class MainConfig {
    public test1: CheckboxData = new CheckboxData("ATest", "atest_value");
    public test2: CheckboxData = new CheckboxData("BTest", "btest_value");
    public test3: CheckboxData = new CheckboxData("CTest", "ctest_value", true);
    public test4: CheckboxData = new CheckboxData("DTest", "dtest_value");
}
