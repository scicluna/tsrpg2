enum ConditionType {
    HasMoney,
    HasAbility,
    ArrivedInTime,
    HasMinimumLevel
}

interface BaseCondition {
    type: ConditionType;
}

interface HasMoneyCondition extends BaseCondition {
    type: ConditionType.HasMoney;
    value: number; // Required amount of money
}

interface HasAbilityCondition extends BaseCondition {
    type: ConditionType.HasAbility;
    value: string; // Name of the required ability
}

interface ArrivedInTimeCondition extends BaseCondition {
    type: ConditionType.ArrivedInTime;
    value: number; // Required time frame
}

interface HasMinimumLevelCondition extends BaseCondition {
    type: ConditionType.HasMinimumLevel;
    value: number; // Required level
}

type Condition = HasMoneyCondition | HasAbilityCondition | ArrivedInTimeCondition | HasMinimumLevelCondition;
