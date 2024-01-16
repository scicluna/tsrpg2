export type ConditionType = "HasMoney" | "HasAbility" | "ArrivedInTime" | "HasMinimumLevel" | "HasFlag" | "none";

export const VALID_CONDITION_TYPE = ["HasMoney", "HasAbility", "ArrivedInTime", "HasMinimumLevel", "HasFlag", "none"];

export interface BaseCondition {
    type: ConditionType;
}

export interface HasMoneyCondition extends BaseCondition {
    type: "HasMoney";
    value: number; // Required amount of money
}

export interface HasAbilityCondition extends BaseCondition {
    type: "HasAbility";
    value: string; // Name of the required ability
}

export interface ArrivedInTimeCondition extends BaseCondition {
    type: "ArrivedInTime";
    value: number; // Required time frame
}

export interface HasMinimumLevelCondition extends BaseCondition {
    type: "HasMinimumLevel";
    value: number; // Required level
}

export interface HasFlagCondition extends BaseCondition {
    type: "HasFlag";
    value: string; // Name of the required flag
}

export interface NoCondition extends BaseCondition {
    type: "none";
}

export type Condition = HasMoneyCondition | HasAbilityCondition | ArrivedInTimeCondition | HasMinimumLevelCondition | HasFlagCondition | NoCondition;
