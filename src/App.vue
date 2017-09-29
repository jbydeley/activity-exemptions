<template>
  <div id="activity-exemptions">
    <button :aria-label="$t('ariaExempt')" class="d2l-button primary" @click="setExempt">
      {{ $t('btnExempt') }}
    </button>
    <button :aria-label="$t('ariaUnexempt')" class="d2l-button" @click="setUnexempt">{{ $t('btnUnexempt') }}</button>

    <p>
      <span class="exemption-count" v-t="'lblExemptions'"></span>
      {{ exemptionCount }}
    </p>
    <table :summary="$t('ariaTableSummary')">
      <thead>
        <tr>
          <th>
            <input :aria-label="$t('ariaSelectUnselectAll')" type="checkbox" class="d2l-checkbox" :checked="allSelected" @change="selectAll">
          </th>
          <!--
          To support both User Information Privacy and RTL, we need to conditionally
          render one of four options. If the API changes in the future to support
          preferred names, this could be reduced or eliminated entirely.
           -->
          <th>
            <span v-if="canSeeFirstName" v-t="'lblFirstName'"></span>
            <span v-if="canSeeLastName" v-t="'lblLastName'"></span>
            <span v-if="!canSeeFirstName && !canSeeLastName" v-t="'lblUser'"></span>
          </th>
          <th v-if="canSeeOrgIdColumn">{{ $t('lblOrgDefinedId') }}</th>
          <th>{{ $t('lblExemptStatus') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in allUsers">
          <td>
            <input :aria-label="ariaSelectText(user)" type="checkbox" class="d2l-checkbox" :checked="user.isSelected" @change="toggleSelection(user)">
          </td>
          <td>{{user.fullName}}</td>
          <td v-if="canSeeOrgIdColumn">{{user.OrgDefinedId}}</td>
          <td>
            <span v-if="isUserExempt(user)">{{ $t('lblExempt') }}</span>
            <span v-else class="d2l-offscreen">{{ $t('lblNotExempt') }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <button :aria-label="$t('ariaLoadMore')" :disabled="isLoading" class="d2l-button" v-if="hasMoreItems" @click="loadMore">{{ $t('btnLoadMore') }}</button>
    <button :aria-label="$t('ariaExempt')" class="d2l-button primary" @click="setExempt">{{ $t('btnExempt') }}</button>
    <button :aria-label="$t('ariaUnexempt')" class="d2l-button" @click="setUnexempt">{{ $t('btnUnexempt') }}</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'activity-exemptions',
  data() {
    return {
      locale: 'en'
    }
  },
  computed: {
    ...mapGetters([
      'allUsers',
      'isUserExempt',
      'exemptionCount',
      'allSelected',
      'hasMoreItems',
      'isLoading',
      'canSeeOrgIdColumn',
      'canSeeFirstName',
      'canSeeLastName'
    ]),

    ariaSelectText() {
      return (user) => this.isUserExempt(user)
        ? this.$t('ariaSelectExemptUser', {fullName: user.fullName})
        : this.$t('ariaSelectNotExemptUser', {fullName: user.fullName})
    }
  },
  methods: {
    ...mapActions([
      'toggleSelection',
      'setExempt',
      'setUnexempt',
      'selectAll',
      'loadMore'
    ])
  }
}
</script>

<style scoped>

.exemption-count {
  display: inline-block;
}

.exemption-count::after {
  content: ":";
}

#activity-exemptions {
  color: #565a5c;
  font-family: 'Lato', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif;
  padding-bottom: 50px;
}

table {
  background-color: transparent;
  border-collapse: separate !important;
  border-spacing: 0;
  display: table;
  font-size: 0.8rem;
  font-weight: 400;
  width: 100%;
}

thead {
  display: table-header-group;
}

thead tr:first-child {
  border-top: 1px solid #d3d9e3;
}

[dir="rtl"] th {
  border-right: 0;
  border-left: 1px solid #d3d9e3;
  text-align: right;
}

th {
  border-top: 1px solid #d3d9e3;
  color: #565a5c;
  background-color: #f9fafb;
  margin: 1rem 0;
  border-right: 1px solid #d3d9e3;
  padding: 1rem;
  text-align: left;
  vertical-align: middle;
}

[dir="rtl"] th:first-child {
  border-top-right-radius: 0.3rem;
  border-top-left-radius: 0;
  border-right: 1px solid #d3d9e3;
  border-left: 1px solid #d3d9e3;
}

th:first-child {
  border-top-left-radius: 0.3rem;
  border-left: 1px solid #d3d9e3;
}

[dir="rtl"] th:last-child {
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0rem;
}


th:last-child {
  border-top-right-radius: 0.3rem;
}

[dir="rtl"] td {
  border-left: 1px solid #d3d9e3;
  border-right: 0;
}

td {
  border-top: 1px solid #d3d9e3;  
  border-right: 1px solid #d3d9e3;
  padding: 1rem;
}

[dir="rtl"] td:first-child {
  border-right: 1px solid #d3d9e3;
  border-left: 1px solid #d3d9e3;
}

td:first-child {
  border-left: 1px solid #d3d9e3;
}

tbody > tr:last-child td {
  border-bottom: 1px solid #d3d9e3;
}

[dir="rtl"] tbody > tr:last-child td:first-child {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0.3rem;
}

tbody > tr:last-child td:first-child {
  border-bottom-left-radius: 0.3rem;
}

[dir="rtl"] tbody > tr:last-child td:last-child {
  border-bottom-left-radius: 0.3rem;
  border-bottom-right-radius: 0;
}

tbody > tr:last-child td:last-child {
  border-bottom-right-radius: 0.3rem;
}

.d2l-button.primary {
  background-color: #006fbf;
  color: #fff;
}

.d2l-button {
  margin: 10px;
  background-color: #f2f3f5;
  border-color: #d3d9e3;
  color: #565a5c;
  border-width: 1px;
  border-style: solid;
  border-radius: 0.3rem;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-family: inherit;
  outline: none;
  padding: 0.5rem 1.5rem;
  box-shadow: 0 0 0 4px rgba(0, 0, 0, 0);
}

.d2l-button.primary:hover {
  background-color: #006fbf;
  color: #fff;
}

.d2l-button:hover {
  background-color: #e6eaf0;
}

.d2l-button:focus {
  border-color: rgba(0, 111, 191, 0.4);
  box-shadow: 0 0 0 4px rgba(0, 111, 191, 0.3);
}

.d2l-checkbox {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 1.2rem 1.2rem;
    border-radius: 0.3rem;
    border-style: solid;
    box-sizing: border-box;
    display: inline-block;
    height: 1.2rem;
    margin: 0;
    padding: 0;
    transition-duration: 0.5s;
    transition-timing-function: ease;
    transition-property: background-color, border-color;
    vertical-align: middle;
    width: 1.2rem;
  }

  .d2l-checkbox:checked {
    background-image: url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22%23565A5C%22%20d%3D%22M8.4%2016.6c.6.6%201.5.6%202.1%200l8-8c.6-.6.6-1.5%200-2.1-.6-.6-1.5-.6-2.1%200l-6.9%207-1.9-1.9c-.6-.6-1.5-.6-2.1%200-.6.6-.6%201.5%200%202.1l2.9%202.9z%22/%3E%3C/svg%3E%0A");
  }
  
  .d2l-checkbox,
  .d2l-checkbox:hover:disabled {
    background-color: #f9fafb;
    border-width: 1px;
  }
  
  .d2l-checkbox:hover,
  .d2l-checkbox:focus {
    border-color: #006fbf;
    border-width: 2px;
    outline-width: 0;
  }

  .d2l-checkbox[aria-invalid="true"] {
    border-color: #cd2026;
  }

  .d2l-checkbox:disabled {
    opacity: 0.5;
  }

  .d2l-offscreen {
    word-wrap: normal !important;
    position: absolute !important;
    left: -10000px;
    overflow: hidden;
    width: 1px;
    height: 1px;
  }
  /* Firefox only, fixed in Firefox 54 */
  /* https://bugzilla.mozilla.org/show_bug.cgi?id=605985 */
  @-moz-document url-prefix() {
    input[type="checkbox"] {
      -moz-appearance: checkbox;
    }
  }
</style>
